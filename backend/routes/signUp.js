let express = require("express");
const signupService =  require("./../services/signUpService");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
let router = express.Router();

router.post("/", (req, res) => {
    let errors = validateSignupInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        signupService.handle_request(req.body, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }

        });
    }
});
function validateSignupInput(req) {
    req.checkBody("username", "An Email address is required.").notEmpty();
    req.checkBody("username", "The email you provided is an invalid email format.").isEmail();
    req.checkBody("password", "A Password is required.").notEmpty();
    req.checkBody("password", "Your Password must contain at least 1 number and 1 letter. \n Your Password must be between 7 and 32 characters.").matches(/^(?=.*\d)(?=.*[a-zA-Z]).{7,32}$/);
    req.checkBody("name", "name is required").notEmpty();
    if (!req.body.role) {
        req.body.role = "traveler"; //default is traveler account.
    }
    let errors = req.validationErrors();
    return errors;
}

module.exports = router;