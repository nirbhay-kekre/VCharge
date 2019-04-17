const express = require("express");

const loginService = require("./../services/loginService");
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./responses');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('./../authProxy/config/settings');

router.post("/", (req, res) => {
    let errors = validateLoginInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        loginService.handle_request( req.body, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                if(result.code === 200){
                    var token = jwt.sign(result.data, config.secret, {
                       // expiresIn: 10080 // in seconds
                    });
                    result.data.token = 'JWT ' + token;
                }
                responseHandler(res, result);
            }
        });
    }
});
function validateLoginInput(req) {
    req.checkBody("username", "An Email address is required.").notEmpty();
    req.checkBody("password", "A Password is required.").notEmpty();
    return req.validationErrors();
}

module.exports = router;
