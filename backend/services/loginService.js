const { prepareForbiddenFailure, prepareInternalServerError, prepareSuccess } = require('./responses')
let { User } = require('./../models/user');
const bcrypt = require("bcrypt");

async function handle_request(req, callback) {
    let resp = {}
    try {
        let user = await User.findOne({
            username: req.username,
        });
        let match = false;
        if (user) {
            match = await bcrypt.compare(req.password, user.password);
        }
        if (match) {
            resp = prepareSuccess({
                username: user.username,
                name: user.name
            });
        } else {
            resp = prepareForbiddenFailure();
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;