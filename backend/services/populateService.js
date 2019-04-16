const { prepareAuthenticationFailure, prepareInternalServerError, prepareSuccess } = require('./responses')
let { Site } = require('../models/site');
const fetch = require('node-fetch');

async function handle_request(req, callback) {
    let resp = {}
    try {
        result = await fetch("https://api.voltaapi.com/v1/public-sites");
        result = await result.json();
        for(let i=0 ;i<result.length; i++){
            s = result[i];
            
            output ={
                id: s.id,
                name: s.name,
                industry: s.industry,
                image_url: s.image_url,
                tips: s.tips,
                street_address: s.street_address,
                city: s.city,
                state: s.state,
                zip_code: s.zip_code,
                coordinates: s.location.coordinates,
                stations: []
            }
            outputSite = output.stations;
            for(let j=0; j< s.stations.length; j++){
                station = s.stations[j];
                let stn = {
                    id: station.id,
                    
                    name: station.name,
                    status: station.status,
                    site_id: station.site,
                    coordinates: station.location.coordinates,
                    street_address: station.street_address,
                    city: station.city,
                    state: station.state,
                    zip_code: station.zip_code,
                    bookingSolts:[]
                }
                outputSite.push(stn);
            }
            let site = await Site.create(output);
        }
        resp=prepareSuccess()
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}


exports.handle_request = handle_request;