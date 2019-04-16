let express = require("express");
const populateService =  require("../services/populateService");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
let router = express.Router();

router.get("/", (req, res) => {
    populateService.handle_request(req.body, function (err, result) {
        if (err) {
            sendInternalServerError(res);
        } else {
            responseHandler(res, result);
        }
    });
});


module.exports = router;