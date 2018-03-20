const path = require('path');
const PORT = require('./config').SERVER.PORT;
const CookieKey = require('./auth/_config').keys.CookieKey;
const multer = require('multer');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth/local');
require('./auth/google');
require('./auth/facebook');

const app = express();

const storage = multer.diskStorage(({
    destination: './public/img/profilePics',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
}));

const upload = multer({
    storage: storage,
    // limits: {fileSize: 10},  // Unit Bytes
    fileFilter: (req, file, cb) => checkFileType(file, cb)
}).single('profilePic');

const routes = {
    users: require('./api/users').route,
    auth: require('./auth/auth_routes').route
};

function checkFileType(file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|gif/i;
    const isextentionValid = allowedFileTypes.test(path.extname(file.originalname));
    const isMimeValid = allowedFileTypes.test(file.mimetype);
    if (isextentionValid && isMimeValid) {
        cb(null, true);
    } else {
        cb('Err: Image Only', false);
    }
}

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    upload(req, res, err => {
        if (err) {
            console.log(err);
        }
        next();
    });
});

app.use(session({
    secret: CookieKey,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "hbs");

app.use('/auth', routes.auth);
app.use('/users', routes.users);

app.listen(PORT, () => {
    console.log(`Yo dawg! Server's at http://localhost:${PORT}`);
});