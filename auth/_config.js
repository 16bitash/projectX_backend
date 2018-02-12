const ids = {
    facebook: {
        clientID: 'get_your_own',
        clientSecret: 'get_your_own',
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    google: {
        clientID: 'get_your_own',
        clientSecret: 'get_your_own',
        callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
    }
};

exports = module.exports = ids;