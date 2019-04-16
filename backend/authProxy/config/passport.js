'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const passportService = require('./../../services/passportService');
var config = require('./settings');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        passportService.handle_request({username: jwt_payload.username}, function (err, result) {
            if (err) {
                callback(err, false);
            } else {
                if(result.code === 200){
                    let user = result.data;
                    callback(null, user);
                } else{
                    return callback(result, false);
                }
            }
        });
    }));
};

