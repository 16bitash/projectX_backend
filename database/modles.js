const Sequelize = require("sequelize");
const DB = require("../config.json").DB;
const datatypes = Sequelize.DataTypes;

const db = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
    host: DB.HOST,
    dialect: DB.DIALECT,
    // logging: false
});

const user = db.define('users', {
    userId: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: datatypes.STRING,
        allowNull: false,
    },
    profilePic: {
        type: datatypes.STRING
    },
    phone: {
        type: datatypes.BIGINT,
        unique: true,
        allowNull: false
    },
    email: {
        type: datatypes.STRING,
        unique: true
    },
    about: {
        type: datatypes.TEXT
    },
    password: {
        // Implement Hashing
        type: datatypes.STRING,
        allowNull: false,
    },
    address: {
        type: datatypes.STRING
    },
    totalRespect: {
        type: datatypes.INTEGER,
        defaultValue: 0
    },
    currentRespect: {
        type: datatypes.INTEGER,
        defaultValue: 0
    },
    isPopular: {
        type: datatypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true
});

const order = db.define('orders', {
    userId: {
        type: datatypes.INTEGER
    },
    orderId: {
        type: datatypes.STRING,
        allowNull: false,
    },
    timeOfOrder: {
        type: datatypes.DATE,
        defaultValue: datatypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
});


const orderDetails = db.define('orderDetails', {
    userId: {
        type: datatypes.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: datatypes.STRING,
        allowNull: false,
    },
    size: {
        type: datatypes.INTEGER,
        unique: true
    },
    address: {
        type: datatypes.STRING,
        allowNull: false
    },
    phone: {
        type: datatypes.INTEGER
    },
    timeOfOrder: {
        type: datatypes.DATE,
        defaultValue: Sequelize.NOW
    },
    designId: {
        type: datatypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

const designs = db.define('designs', {
    designPrice: {
        type: datatypes.INTEGER,
        allowNull: false
    },
    sex: {
        // male, female, uni
        type: datatypes.STRING,
        defaultValue: 'uni'
    },
    designId: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    designOwner: {
        type: datatypes.STRING,  // User ID
        // allowNull: false
    },
    designName: {
        type: datatypes.STRING,
        // allowNull: false
    },
    isPopular: {
        type: datatypes.BOOLEAN,
        defaultValue: false
        // allowNull: false
    },
    topWear: {
        // 0-tshirt, 1-vneck, 2-hoodie, 3-all
        type: datatypes.INTEGER,
        // allowNull: false
    },
    designCatagory: {
        type: datatypes.INTEGER
    },
    color: {
        type: datatypes.STRING
    },
    designAttributes: {
        type: datatypes.TEXT
    },
    NumberOfSale: {
        type: datatypes.INTEGER,
        defaultValue: 0
    },
}, {
    freezeTableName: true
});

Promise.all([
    user.sync({force: true}),
    order.sync({force: true}),
    orderDetails.sync({force: true}),
    designs.sync({force: true})
]).then(() => console.log('Database connected!'))
    .catch(err => console.error(err));

module.exports = exports = {
    user,
    order,
    orderDetails,
    designs
};