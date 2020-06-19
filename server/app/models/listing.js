import mongoose from 'mongoose';

const listingSchema = mongoose.Schema({
  listingTitle: { type: String, required: true },
  listingURL: { type: String, required: true },
  willEndAt: { type: String, required: true },
  pushoverTokens: [ String ],
  phoneNumbers: [ String ]
});

export const Listing =  mongoose.model('Listing', listingSchema)