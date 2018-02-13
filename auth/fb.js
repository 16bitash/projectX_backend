const passport = require('../passport');
const FacebookStrategy = require('passport-facebook');
const config = require('./_config');
const User = require('../api/users');

passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    () => {
        // passport callback function
    }
));

exports = module.exports = FacebookStrategy;