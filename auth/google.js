const userFunction = require('../api/usersUtility').Exported;
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
        let profileInfo = {};
        profileInfo.googleId = profile.id;
        profileInfo.name = profile.displayName;
        profileInfo.profilePic = profile.photos[0].value;
        console.log(userFunction.getUser(profileInfo.googleId, 'google'));
        if (userFunction.getUser(profileInfo.googleId, 'google')) {
            // means we already have a account linked with google
            console.log("this google account already linked with our database");
            // do something
        } else {
            // means we will now save this account
            userFunction.addUser(profileInfo);
        }
    }
));

exports = module.exports = GoogleStrategy;