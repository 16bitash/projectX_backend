const route = require('express').Router();
const passport = require('passport');
const config = require('./_config');


route.get('/login', (req, res) => {
    res.render('login')
});

route.get('/login', (req, res) => {
    res.send('logging out')
});

route.get('/facebook', passport.authenticate('facebook'));
route.get('/facebook/redirect',
    function (req, res) {
        res.send('redirect URI');
    });

route.get('/google', passport.authenticate('google', {scope: config.google.scope}));
route.get('/google/redirect', passport.authenticate('google'),
    (req, res) => {
        res.send('google redirect URI');
    });


route.get('/signup', (req, res) => {
    res.render('signup')
});

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
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