require('dotenv').config();
const mongodb = require('mongodb');
const {getProductPage} = require("../controllers/Shop.controller");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`)
        .then((client) => {
            console.log('Connected to mongodb');
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.error('Connection failed', err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database';
}

module.exports = {
    mongoConnect,
    getDb,
};