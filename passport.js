const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./database/modles').user;

passport.serializeUser(function (user, done) {
    done(null, user.userId)
});

passport.deserializeUser(function (userid, done) {
    Users.findOne({
        userId: userid
    }).then((user) => {
        if (!user) {
            return done(new Error("no such user"))
        }
        done(null, user)
    }).catch((err) => {
        done(err)
    })
});

passport.use(new LocalStrategy(function (username, password, done) {
    Users.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, {message: "No such User"})
        }
        if (user.password !== password) {
            return done(null, false, {message: "Wrong Password"})
        }
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}));

exports = module.exports = passport;