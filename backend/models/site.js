const mongoose = require('mongoose'),
 Schema = mongoose.Schema;
 const siteSchema = new Schema({
    id: String,
    name: String,
    industry: String,
    image_url: String,
    tips: String,
    street_address: String,
    city: String,
    state: String,
    zip_code: Number,
    chargers:{
        available: Number,
        total: Number
    },
    coordinates: [ Number ],
    stations: [
      {
        id: String,
        
        name: String,
        status: String,
        site_id: String,
        coordinates: [ Number ],
        street_address: String,
        city: String,
        state: String,
        zip_code: String,
        bookingSolts:[{
          start: String,
          end: String,
          email: String
        }]
      }
    ]
  });

const Site = mongoose.model('sites', siteSchema);
module.exports = {Site};