let express = require("express");
const getHistoryService = require("../services/getHistoryService");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
let router = express.Router();

router.get("/", (req, res) => {
    let errors = validateHistoryInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    } else {
        getHistoryService.handle_request(req.query, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});
module.exports = router;

function validateHistoryInput(req) {
    req.checkQuery("username", "username is required.").notEmpty();
    return req.validationErrors();
}