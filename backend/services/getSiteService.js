const { prepareAuthenticationFailure, prepareInternalServerError, prepareSuccess } = require('./responses')
let { Site } = require('../models/site');

async function handle_request(req, callback) {
    let resp = {}
    try {
        
        let sites = await Site.find({});
        resp=prepareSuccess({sites})
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}


exports.handle_request = handle_request;