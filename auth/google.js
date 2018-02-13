const passport = require('../passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./_config');
const User = require('../api/users');

passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        // passport callback function
    }
));

exports = module.exports = GoogleStrategy;