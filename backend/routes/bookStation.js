let express = require("express");
const bookStationService =  require("../services/bookStationService");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
let router = express.Router();

router.post("/", (req, res) => {
    let errors = validateBookInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }else{ bookStationService.handle_request(req.body, function (err, result) {
        if (err) {
            sendInternalServerError(res);
        } else {
            responseHandler(res, result);
        }
    });
}
});

function validateBookInput(req) {
    req.checkBody("username", "username is required.").notEmpty();
    req.checkBody("start", "start is required.").notEmpty();
    req.checkBody("end", "end is required.").notEmpty();
    req.checkBody("site_id", "site_id is required.").notEmpty();
    return req.validationErrors();
}
module.exports = router;