require('dotenv').config();
const express =  require('express');
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require('connect-mongodb-session')(session);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;

const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: "sessions",
});
const app = express();

const shopRouter = require('./src/routes/Shop.routes');
const adminRouter = require('./src/routes/Admin.routes');
const appRouter = require('./src/routes/App.routes');
const authRouter = require('./src/routes/Auth.routes');
const User = require("./src/models/User.model");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, '..', "app/src/views/"));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store
}));
app.use((req, res, next) => {
    if (!req.session.user) {
       return next();
    }
    User.findById(req.session.user._id).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    });
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './src/public')));

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(authRouter);
app.use(appRouter);

mongoose.connect(MONGODB_URI).then(result => {
    app.listen(PORT);
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});