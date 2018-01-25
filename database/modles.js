const Sequelize = require("sequelize");
const DB = require("../config.json").DB;
const datatypes = Sequelize.DataTypes;

const db = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
    host: DB.HOST,
    dialect: DB.DIALECT,
    // logging: false
});

const user = db.define('users', {
    phone: {
        type: datatypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: datatypes.STRING,
        allowNull: false,
    },
    email: {
        type: datatypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        // Implement Hashing
        type: datatypes.STRING,
        allowNull: false,
    },
    address1: {
        type: datatypes.STRING
    },
    address2: {
        type: datatypes.STRING
    },
    address3: {
        type: datatypes.STRING
    },
    cridits: {
        type: datatypes.INTEGER,
        primaryKey: true,
    },
    isPopular: {
        type: datatypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true
});