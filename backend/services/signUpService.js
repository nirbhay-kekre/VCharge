const { prepareInternalServerError, prepareSuccess, prepareResourceConflictFailure } = require('./responses')
const { User } = require('./../models/user');
const {bookingHistory} = require("./../models/bookingHistory")
const bcrypt = require("bcrypt");

async function handle_request(req, callback) {
    const { username, password, name } = req;
    let resp = {}
    try {
        let match = await User.findOne({
            username: username,
        });
        if (match) {
            resp = prepareResourceConflictFailure({
                message: "Email address is already in use."
            });
        } else {
            const cypher = await bcrypt.hash(password, 10);
            let user = await User.create({ username, password: cypher, name });
            await bookingHistory.create({
                username,
                history:[]
            })
            console.log("created new user", user);
            resp = prepareSuccess({ username: user.username, firstname: user.firstname, lastname: user.lastname });
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;