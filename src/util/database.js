const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, 'root', process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: 'database',
    port: '3306',
});

module.exports = sequelize;