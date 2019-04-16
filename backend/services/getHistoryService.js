const { prepareInternalServerError, prepareSuccess } = require('./responses')
let { bookingHistory } = require('../models/bookingHistory');

async function handle_request(req, callback) {
    let resp = {}
    try {
        filter = prepareSearchCriteria(req)
        let history = await bookingHistory.find(filter, { _id: 0, __v: 0 });
        resp = prepareSuccess({ history })
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

function prepareSearchCriteria(req) {
    const { username } = req;
    return {username};
}

exports.handle_request = handle_request;