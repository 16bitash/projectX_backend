const route = require('express').Router();
const Users = require('../database/modles').user;
const passport = require('../passport');
const FBStrategy = require('passport-facebook').Strategy;

const routes = {
    users: require('../api/users').route
};

route.get('/login', (req, res) => {
    res.render('login')
});


// ===== idk why GET request is used instead of POST req =====
route.get('/login/facebook',
    passport.authenticate('facebook'));

route.get('/login/facebook/return',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
    });
// ===== idk why GET request is used instead of POST req =====


route.get('/login/google', (req, res) => {
    res.render('login')
});

route.get('/signup', (req, res) => {
    res.render('signup')
});

route.get('/signup/facebook', (req, res) => {
    res.render('signup')
});

route.get('/signup/google', (req, res) => {
    res.render('signup')
});

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/private'
}));

route.post('/signup', (req, res) => {
    let userInfo = Users.findOne({
        where: {
            userId: req.body.userId
        }
    });
    if (userInfo.userId === req.body.userId) {
        res.send("user already exist")
    }
    Users.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    }).then((createdUser) => {
        res.redirect('/login')
    })
});


exports = module.exports = route;