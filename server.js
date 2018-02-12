const express = require("express");
const path = require("path");
const PORT = require("./config").SERVER.PORT;
require('./database/modles');  // To make sure database is connected

const app = express();

const routes = {
    users: require('./api/users').route
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', routes.users);


app.listen(PORT, () => {
    console.log("Yo dawg! Server's at http://localhost:" + PORT);
});