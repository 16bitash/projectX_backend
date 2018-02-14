const passport = require('../passport');
const FacebookStrategy = require('passport-facebook');
const config = require('./_config').ids;
const User = require('../api/users');

passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log(profile);
    }
));

exports = module.exports = FacebookStrategy;