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

const profilePicStorage = multer.diskStorage(({
    destination: './public/img/profilePics',
    filename: nameThatBitch
}));

const designImageStorage = multer.diskStorage(({
    destination: './public/img/designImages',
    filename: nameThatBitch
}));

const uploadProfilePic = multer({
    storage: profilePicStorage,
    // limits: {fileSize: 10},  // Unit Bytes
    fileFilter: checkFileType
}).single('profilePic');

const uploadDesignImage = multer({
    storage: designImageStorage,
    // limits: {fileSize: 10},  // Unit Bytes
    fileFilter: checkFileType
}).array('designImage');

const routes = {
    users: require('./api/users').route,
    auth: require('./auth/auth_routes').route,
    designs: require('./api/design').route
};

function nameThatBitch(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}

function checkFileType(req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|gif/i;
    const isExtensionValid = allowedFileTypes.test(path.extname(file.originalname));
    const isMimeValid = allowedFileTypes.test(file.mimetype);
    if (isExtensionValid && isMimeValid) {
        cb(null, true);
    } else {
        cb('Err: Image Only', false);
    }
}

const app = express();

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'public', 'img', 'designImages')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', (req, res, next) => {
    uploadProfilePic(req, res, err => {
        if (err) {
            console.log(err);
        }
        next();
    });
});

app.use('/designs', (req, res, next) => {
    uploadDesignImage(req, res, err => {
        if (err) {
            console.log(err);
        }
        next();
    });
});

app.use((req, res, next) => {
    // Make sure there is no key with empty value
    Object.keys(req.body).forEach(element => {
        if (req.body[element] === '') {
            delete req.body[element];
        }
    });
    next();
});

app.use(session({
    secret: CookieKey,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', routes.auth);
app.use('/users', routes.users);
app.use('/designs', routes.designs);

app.listen(PORT, () => {
    console.log(`Yo dawg! Server's at http://localhost:${PORT}`);
});