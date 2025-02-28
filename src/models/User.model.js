const Sequelize = require('sequelize');

const sequelize = require("../util/database");

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = User;