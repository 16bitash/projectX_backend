const ids = {
    facebook: {
        clientID: '182177968942410',
        clientSecret: '4c790f68ccbf23960ed117fb5b60a97a',
        callbackURL: "auth/facebook/redirect"
    },
    google: {
        clientID: '453550727083-koh15o7kv6b16a05vk6hknproo9kbmmb.apps.googleusercontent.com',
        clientSecret: 'VR2dJRSQrV6fZeM4zgV2MF9_',
        callbackURL: "/auth/google/redirect",
        scope: ['profile', 'phone', 'email']
    }
};

const keys = {
    CookieKey: 'somesecretstring'
};

exports = module.exports = {
    ids, keys
};