require('dotenv').config();
const express =  require('express');
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();
const shopRouter = require('./src/routes/Shop.routes');
const adminRouter = require('./src/routes/Admin.routes');
const appRouter = require('./src/routes/App.routes');

const User = require('./src/models/User.model');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, '..', "app/src/views/"));

app.use((req, res, next) => {
    User.findById('67c813e581a85165a32bf64e').then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    })
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './src/public')));

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(appRouter);

mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`).then(result => {
    app.listen(PORT);
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});