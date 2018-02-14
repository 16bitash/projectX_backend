const passport = require('../passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./_config').ids;
const User = require('../database/modles').user;
const DatabaseAPIClass = require('../api/functions').databaseAPI;
const APIHelperFunctions = new DatabaseAPIClass(User);

passport.serializeUser(function (user, done) {
    done(null, user.userId)
});

passport.deserializeUser(function (userid, done) {
    APIHelperFunctions.getSpecificData('userId', userid).then((user) => {
        if (!user) {
            return done(new Error("no such user"))
        }
        done(null, user)
    }).catch((err) => {
        done(err)
    })
});

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
        profileInfo.email = profile.emails[0].value;
        profileInfo.about = profile._json.tagline;
        console.log("************************");
        APIHelperFunctions.getSpecificData('googleId', profileInfo.googleId).then((currentUser) => {
            console.log(currentUser);
            if (currentUser) {
                // means we already have a account linked with google
                console.log("already linked with:" + currentUser);
                done(null, currentUser);
            } else {
                // means we will now save this account
                console.log("creating new record");
                //we haven't saved phoneNumber and password yet
                APIHelperFunctions.addRow(profileInfo).then((newUser) => {
                    console.log('newUser created is: ' + newUser);
                    done(null, newUser);
                });
            }
        });

    }
));

exports = module.exports = GoogleStrategy;