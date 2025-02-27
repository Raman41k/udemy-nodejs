const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'database',
    user: 'root',
    database: 'noda',
    password: 'root',
    port: 3306,
});

module.exports = pool.promise();