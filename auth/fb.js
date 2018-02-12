const passport = require('../passport');
const FacebookStrategy = require('passport-facebook');
const config = require('./_config');
const User = require('../api/users');
var init = require('./init');

passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
    // what happens when we get data from facebook
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

// serialize user into the session
init();


module.exports = passport;