const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const PORT = require('./config').SERVER.PORT;

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

const routes = {
    users: require('./api/users').route,
    designs: require('./api/design').route
};

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

app.use('/users', routes.users);
app.use('/designs', routes.designs);

app.listen(PORT, () => {
    console.log(`Yo dawg! Server's at http://localhost:${PORT}`);
});