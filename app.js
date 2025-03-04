const express =  require('express');
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const app = express();
const shopRouter = require('./src/routes/Shop.routes');
const adminRouter = require('./src/routes/Admin.routes');
const appRouter = require('./src/routes/App.routes');

const User = require('./src/models/User.model');

const { mongoConnect } = require('./src/util/database');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, '..', "app/src/views/"));

app.use((req, res, next) => {
    User.getById('67c59a128553396ef967d42a').then(user => {
        req.user = new User(user.usermame, user.email, user.cart, user._id);
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

mongoConnect(() => {
    app.listen(PORT);
});