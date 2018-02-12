const route = require('express').Router();
const Users = require('../database/modles').user;
const passport = require('../passport');

const routes = {
    users: require('../api/users').route
};

route.get('/login', (req, res) => {
    res.render('login')
});

route.get('/signup', (req, res) => {
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