// Module imports
import { CronJob } from 'cron';
import axios from 'axios';
import cheerio from 'cheerio';

// App imports
import { Listing } from '../models/listing';
import Pushover from 'pushover-notifications';

/**
 * Cron task which runs every 5 minutes and invokes checkForDocuments()
 */
const sendNotification = new CronJob('0 */5 * * * *', () => {
  checkForDocuments();
}, null, true, 'America/Los_Angeles');

sendNotification.start();

/**
 * Will check if there are any documents in the db which have an ending time
 *    of less than the current time (UTC).
 */
const checkForDocuments = () => {
  const currentDate = new Date(Date.now()).toISOString();

  Listing.find({ willEndAt: { $lte: currentDate } }).then(allDocs => {
    if (allDocs.length !== 0) {
      allDocs.forEach((listing) => {
        const { pushoverTokens, listingTitle, listingURL } = listing;
        axios(listingURL)
           .then(response => {
              const html = response.data;
              const $ = cheerio.load(html);

              // Check if listing is still being bid on
              const listingStatus = $('.listing-available-info .data-label').first().text()
              const listingFinished = listingStatus !== 'Current Bid:';
              
              if (listingFinished) {
                const price = $('.listing-available-info .data-value').first().text();

                const data = {
                  pushoverTokens,
                  listingTitle,
                  listingURL,
                  listingPrice: price
                }

                pushoverSender(data).then(() => {
                  // Deletes the document sending out all notifications
                  Listing.deleteOne({ _id: listing.id }, (error, result) => {
                    if (error) {
                      console.error(error)
                    }
                  })
                })
              }
          })
      })
    }
  }).catch(console.error);
}

/**
 * Connects to pushover to send out notification to pushover users
 */
// NOTES:
//  - Max user count per request is 50. Will need to update this in the future
const pushoverSender = (data) =>{
  const { listingTitle, listingURL, listingPrice, pushoverTokens } = data;

  const push = new Pushover({
    token: process.env.PUSHOVER_TOKEN,
    user: 'XXXX',
  });

  const baseMsg = {
    message: `${listingTitle} — sold for ${listingPrice} (USD).\nBaT link: ${listingURL}`,
    title: `BaT — ${listingTitle}`,
  }


  for (const token of pushoverTokens) {
    let msg = baseMsg;
    baseMsg.user = token;

    push.send(msg, (error, result) => {
      if (error) {
        console.log(error);
      }
    })
  }

  return Promise.resolve('finished');
};