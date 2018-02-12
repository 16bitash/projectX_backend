const route = require('express').Router();
const Users = require('../database/modles').user;

route.get('/', (req, res) => {
    getUser(req.query.userId).then(user => res.send(user));
});

route.get('/all', (req, res) => {
    getAllUsers().then(allUsers => res.send(allUsers));
});

route.post('/', (req, res) => {
    addUser(req.body).then(newUser => res.send(newUser));
});

// TODO: Prevent users from changing userId
route.put('/:userId', (req, res) => {
    updateUser(req.params.userId, req.body).then(updatedUser => res.send(updatedUser));
});

route.delete('/:userId', (req, res) => {
    deleteUser(req.params.userId).then(deletedUser => res.send(deletedUser));
});

function getUser(userId) {
    return Users.findOne({where: {userId: userId}});
}

function getAllUsers() {
    return Users.findAll();
}

function addUser(userInformation) {
    return Users.create(userInformation);
}

function updateUserById(userId, newUserInformation) {
    return new Promise((resolve, reject) => {
        Users.update(newUserInformation, {where: {userId: userId}})
            .then(() => Users.findOne({where: {userId: userId}}))
            .then(user => resolve(user))
            .catch(err => reject(err));
    })
}

function deleteUserById(userId) {
    return new Promise((resolve, reject) => {
        let deletedUser;
        Users.findOne({where: {userId: userId}})
            .then(userToBeDeleted => {
                deletedUser = userToBeDeleted;
                return Users.destroy({where: {userId: userId}})
            })
            .then(() => resolve(deletedUser));
    })
}

exports.route = route;