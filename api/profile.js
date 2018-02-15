const route = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login')
    } else {
        next();
    }
};

route.get('/', authCheck, (req, res) => {
    res.send('you are logged in , Hello -' + req.user.userName)
});

exports = module.exports = route;