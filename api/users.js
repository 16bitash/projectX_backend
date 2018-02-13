const route = require('express').Router();
const Users = require('../database/modles').user;
const UserFunctions = require('./usersUtility').Exported;

route.get('/', (req, res) => {
    UserFunctions.getUser(req.query.userId).then(user => res.send(user));
});

route.get('/all', (req, res) => {
    UserFunctions.getAllUsers().then(allUsers => res.send(allUsers));
});

route.post('/', (req, res) => {
    UserFunctions.addUser(req.body).then(newUser => res.send(newUser));
});

// TODO: Prevent users from changing userId
route.put('/:userId', (req, res) => {
    UserFunctions.updateUser(req.params.userId, req.body).then(updatedUser => res.send(updatedUser));
});

route.delete('/:userId', (req, res) => {
    UserFunctions.deleteUser(req.params.userId).then(deletedUser => res.send(deletedUser));
});


exports.route = route;