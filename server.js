const express = require("express");
const session = require('express-session');
const passport = require('./passport');
const passportGoogleSetup = require('./auth/google');
const passportFbSetup = require('./auth/fb');
const path = require("path");
const PORT = require("./config").SERVER.PORT;
require('./database/modles');  // To make sure database is connected

const app = express();

const routes = {
    users: require('./api/users').route
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'somesecretstring'
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "hbs");

app.use('/auth', require('./auth/auth_routes'));
app.use('/users', routes.users);

app.listen(PORT, () => {
    console.log("Yo dawg! Server's at http://localhost:" + PORT);
});