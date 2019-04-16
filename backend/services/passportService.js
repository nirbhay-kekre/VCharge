const { prepareAuthenticationFailure, prepareInternalServerError, prepareSuccess } = require('./responses')
const { User } = require('./../models/user');

async function handle_request(req, callback) {
    let resp = {}
    try {
        let user = await User.findOne({
            username: req.username,
        });
        if (user) {
            resp = prepareSuccess({
                username: user.username,
                firstname: user.name
            });
        }
        else {
            resp = prepareAuthenticationFailure();
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;