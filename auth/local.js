const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../database/modles').user;
const DatabaseAPIClass = require('../api/functions').databaseAPI;
const APIHelperFunctions = new DatabaseAPIClass(User);

passport.serializeUser(function (user, done) {
    done(null, user.userId)
});

passport.deserializeUser(function (userid, done) {
    APIHelperFunctions.getSpecificData('userId', userid)
        .then((user) => {
            if (!user) {
                return done(new Error("no such user"))
            }
            done(null, user)
        }).catch((err) => {
        done(err)
    })
});

passport.use(new LocalStrategy((username, password, done) => {
    APIHelperFunctions.getSpecificData('userName', username)
        .then((user) => {
            if (!user) {
                console.log("nouser");
                return done(null, false, {message: "No such User"})
            }
            if (user.password !== password) {
                console.log("wrongpass");
                return done(null, false, {message: "Wrong Password"})
            }
            return done(null, user)
        }).catch((err) => {
        return done(err)
    })
}));

exports = module.exports = passport;