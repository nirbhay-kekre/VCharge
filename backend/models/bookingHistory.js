const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

const bookingHistorySchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    history:[{
        name: String,
        start: String,
        end: String,
        site_id: String,
        station_id: String,
        coordinates: [ Number ],
        street_address: String,
        city: String,
        state: String,
        zip_code: String,
        amount_paid: Number
    }]
});

const bookingHistory = mongoose.model('history', bookingHistorySchema);
module.exports = {bookingHistory};