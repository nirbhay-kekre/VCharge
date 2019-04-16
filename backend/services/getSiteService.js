const { prepareInternalServerError, prepareSuccess } = require('./responses')
let { Site } = require('../models/site');

async function handle_request(req, callback) {
    let resp = {}
    try {
        filter = prepareSearchCriteria(req)
        let sites = await Site.find(filter);
        resp=prepareSuccess({sites})
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

function prepareSearchCriteria(req){
    filter = {}
    const {name} = req;
    if(name){
        filter.name= { $regex: ".*" + name + ".*" }
    }
    return filter;
}

exports.handle_request = handle_request;