const route = require('express').Router();
const Users = require('../database/modles').user;
const DatabaseAPIClass = require('./functions').databaseAPI;
const APIHelperFunctions = new DatabaseAPIClass(Users);

route.get('/', (req, res) => {
    APIHelperFunctions.getSpecificData('userId', req.query.userId).then(data => res.send(data));
});

route.get('/all', (req, res) => {
    APIHelperFunctions.getAllData().then(allUsers => res.send(allUsers));
});

route.post('/', (req, res) => {
    if (req.file) {
        req.body.profilePic = req.file.filename;
    }
    APIHelperFunctions.addRow(req.body).then(newUser => res.send(newUser));
});

// TODO: Prevent users from changing userId
route.put('/:userId', (req, res) => {
    if (req.file) {
        req.body.profilePic = req.file.filename;
    }
    APIHelperFunctions.updateRow('userId', req.params.userId, req.body)
        .then(updatedInformation => res.send(updatedInformation));
});

route.delete('/:userId', (req, res) => {
    APIHelperFunctions.deleteRow('userId', req.params.userId).then(deletedUser => res.send(deletedUser));
});

exports.route = route;