const { prepareInternalServerError, prepareSuccess } = require('./responses')
let { Site } = require('../models/site');

async function handle_request(req, callback) {
    let resp = {}
    try {
        filter = prepareSearchCriteria(req)
        let sites = await Site.find(filter, { _id: 0, __v: 0 });
        let currentDate = new Date();
        let currentDateString = currentDate.toISOString();
        sites = JSON.stringify(sites);
        sites = JSON.parse(sites);
        sites.map((site) => {
            let total = site.stations.length;
            let available = total;
            site.stations.map(station => {
                let bookingSolts = station.bookingSolts;
                for (let i = 0; i < bookingSolts.length; i++) {
                    let start = bookingSolts[i].start;
                    let end = bookingSolts[i].end;
                    if (currentDateString.localeCompare(start) >= 0 && currentDateString.localeCompare(end) <= 0) {
                        available--;
                        break;
                    }
                }
            });
            site.chargers = {
                available, total
            };

        })
        resp = prepareSuccess({ sites })
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

function prepareSearchCriteria(req) {
    filter = {}
    const { name } = req;
    if (name) {
        filter.name = { $regex: ".*" + name + ".*", '$options' : 'i' }
    }
    return filter;
}

exports.handle_request = handle_request;
