const Users = require('../database/modles').user;
const Exported = {
    getAllUsers: function () {
        return Users.findAll();
    },
    getUser: function (userId, googleOrFb = 'nothing') {
        if (googleOrFb === 'nothing') {
            return Users.findOne({where: {userId: userId}});
        }
        if (googleOrFb === 'fb') {
            return Users.findOne({where: {fbId: userId}});
        } else {
            return Users.findOne({where: {googleId: userId}});
        }
    },
    addUser: function (userInformation) {
        return Users.create(userInformation);
    },
    updateUserById: function (userId, newUserInformation) {
        return new Promise((resolve, reject) => {
            Users.update(newUserInformation, {where: {userId: userId}})
                .then(() => Users.findOne({where: {userId: userId}}))
                .then(user => resolve(user))
                .catch(err => reject(err));
        })
    },
    deleteUserById: function (userId) {
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

};


exports = module.exports = {
    Exported
};