var passport = require("passport");
var passportJWT = require("passport-jwt");
const users = require('./models/users');
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

module.exports = () => {
    var strategy = new Strategy(params, function(payload, done) {
        var user = users[payload.email] || null;
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            console.log('xyz');
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};