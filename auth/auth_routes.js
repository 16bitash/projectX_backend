const route = require('express').Router();
const passport = require('passport');
const config = require('./_config').ids;
const User = require('../database/modles').user;
const DatabaseAPIClass = require('../api/functions').databaseAPI;
const APIHelperFunctions = new DatabaseAPIClass(User);

route.get('/login', (req, res) => {
    res.render('login')
});

route.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login')
});

route.get('/facebook', passport.authenticate('facebook'));
route.get('/facebook/redirect', passport.authenticate('facebook', {scope: config.facebook.scope}),
    (req, res) => {
        // res.send(req.user);
        res.redirect('/profile')
    });

route.get('/google', passport.authenticate('google', {scope: config.google.scope}));
route.get('/google/redirect', passport.authenticate('google'),
    (req, res) => {
        // res.send(req.user);
        res.redirect('/profile')
    });


route.get('/signup', (req, res) => {
    res.render('signup')
});

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/profile',
}));

// post request to sign-up don't need passportJS
route.post('/signup', (req, res) => {
    APIHelperFunctions.getSpecificData('userName', req.body.userName)
        .then((currentUser) => {
            if (currentUser.userName === req.body.userName) {
                res.send("username already exist")
                // disable sign-up button till username is unique
                // create AJAX request(refresh button) from frontend to check for username uniqueness
            }
        });


    userInfo = {
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        phone: req.body.phone
    };
    APIHelperFunctions.addRow(userInfo)
        .then((createdUser) => {
            res.redirect('/auth/login')
        });
});

exports = module.exports = route;