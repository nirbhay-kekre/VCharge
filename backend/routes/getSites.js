let express = require("express");
const getSiteService =  require("../services/getSiteService");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
let router = express.Router();

router.get("/", (req, res) => {
    getSiteService.handle_request(req.query, function (err, result) {
        if (err) {
            sendInternalServerError(res);
        } else {
            responseHandler(res, result);
        }
    });
});
module.exports = router;