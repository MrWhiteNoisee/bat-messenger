'use strict'

import { Router } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cheerio from 'cheerio';

import { Listing } from '../models/listing';

const listingRouter = module.exports = new Router();

listingRouter.post('/api/add-listing', bodyParser.json(), (req, res, rej) => {

  const { url, pushoverToken } = req.body;

  axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      
      const title = $('.listing-post-title').text();
      const unixTime = $('.listing-available-info .listing-available-countdown').data('until');

      if (unixTime === undefined) {
        return res.send({
          msg: `${title} has ended`,
          numberOfWatchers: 0,
          endingDate: ''
        })
      }

      const date = new Date(unixTime * 1000).toISOString();

      const data = {
        listingTitle: title,
        listingURL: url,
        willEndAt: date,
        pushoverTokens: [ pushoverToken ]
      }

      Listing.find({ listingURL: url }).then(docExists => {
        if (docExists.length !== 0) {
          const pushoverTokensArray = docExists[0].pushoverTokens;
          if (pushoverTokensArray.includes(pushoverToken)) {
            return res.send({
              msg: 'Your pushover id is already set on this listing',
              numberOfWatchers: pushoverTokensArray.length,
              endingDate: date
            })
          } else {
            Listing.updateOne({_id: docExists._id }, { $push: { pushoverTokens: pushoverToken } }, () => {
              return res.send({
                msg: 'You will be notified shortly after this listing ends',
                numberOfWatchers: pushoverTokensArray.length,
                endingDate: date
              });
            })
          }
        } else {
          Listing.create(data).then(() => {
            return res.send({
              msg: 'You will be notified shortly after this listing ends',
              numberOfWatchers: 1,
              endingDate: date
            });
          });
        }

      }).catch(error => {
        console.error(error); 
      })
    })
    .catch((error) => {
      console.error(error);
    });
});
