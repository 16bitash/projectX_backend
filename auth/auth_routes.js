const route = require('express').Router();
const passport = require('passport');
const config = require('./_config').ids;
const User = require('../database/modles').user;
const DatabaseAPIClass = require('../api/functions').databaseAPI;
const APIHelperFunctions = new DatabaseAPIClass(User);

route.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login')
});

routes = {
    google: require('./google').route,
    facebook: require('./facebook').route,
    local: require('./local').route
};

route.use('/google', routes.google);
route.use('/facebook', routes.facebook);
route.use('/local', routes.local);

exports = module.exports = {
    route
};