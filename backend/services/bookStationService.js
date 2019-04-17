const { prepareForbiddenFailure, prepareInternalServerError, prepareSuccess } = require('./responses')
let { Site } = require('./../models/site');
let { bookingHistory } = require("./../models/bookingHistory")

async function handle_request(req, callback) {
    let resp = {}
    let {
        username,
        start,
        end,
        site_id } = req;
    try {
        site = await Site.findOne({
            id: site_id
        });

        if (site) {
            stations = site.stations;
            available = true;
            coordinates = [];

            street_address = "", city = "", state = "", zip_code = "", name = site.name;
            for (let i = 0; i < stations.length; i++) {
                available = true;
                station = stations[i];
                station_id = station.id;
                coordinates = station.coordinates;
                street_address = station.street_address;
                city = station.city;
                state = station.state;
                zip_code = station.zip_code;
                for (let j = 0; j < station.bookingSolts.length; j++) {
                    slot = station.bookingSolts[j];
                    if (start.localeCompare(slot.start) != -1 && start.localeCompare(slot.end) == -1) {
                        available = false;
                        break;
                    }
                    if (end.localeCompare(slot.start) == 1 && end.localeCompare(slot.end) != 1) {
                        available = false;
                        break;
                    }
                    if (start.localeCompare(slot.start) != 1 && end.localeCompare(slot.start) != -1) {
                        available = false;
                        break;
                    }
                    if (start.localeCompare(slot.end) != 1 && end.localeCompare(slot.end) != -1) {
                        available = false;
                        break;
                    }

                }
                if (available) {
                    station.bookingSolts.push({
                        start, end, username
                    })
                    let updated = await Site.findOneAndUpdate({ id: site_id },
                        {
                            stations
                        }, { new: true, projection: { _id: 0, __v: 0 } });

                    history = {
                        name,
                        start,
                        end,
                        site_id: site_id,
                        station_id: station_id,
                        coordinates,
                        street_address,
                        city,
                        state,
                        zip_code
                    }
                    await bookingHistory.findOneAndUpdate({ username },
                        {
                            $push: { history: history }
                        });
                    resp = prepareSuccess({
                        success: true,
                        site: updated
                    })
                    break;
                } 
            }
            if(!available){
                resp = prepareSuccess({
                    success: false,
                    message: "Station is not available"
                })
            }
        } else {
            resp = prepareSuccess({
                success: false,
                message: "Site doesn't exist"
            })
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;