const { prepareInternalServerError, prepareSuccess, prepareResourceConflictFailure } = require('./responses')
const { User } = require('./../models/user');
const { bookingHistory } = require("./../models/bookingHistory")
const bcrypt = require("bcrypt");

async function handle_request(req, callback) {
    let { username, password, name, isGoogle } = req;
    let resp = {}
    try {
        let match = await User.findOne({
            username: username,
        });
        if (match) {
            if (isGoogle) {
                resp = prepareSuccess({ username: match.username, name: match.name });
            } else {
                resp = prepareResourceConflictFailure({
                    message: "Email address is already in use."
                });
            }
        } else {
            if (isGoogle) {
                password = "Google"
            }
            const cypher = await bcrypt.hash(password, 10);
            let user = await User.create({ username, password: cypher, name });
            await bookingHistory.create({
                username,
                history: []
            })
            console.log("created new user", user);
            resp = prepareSuccess({ username: user.username, name: user.name });
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;