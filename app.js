const express =  require('express');
const path = require("path");
const bodyParser = require("body-parser");


const app = express();
const shopRouter = require('./src/routes/Shop.routes');
const adminRouter = require('./src/routes/Admin.routes');

// Setup for pug engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, '..', "app/src/views/pug"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './src/public')));
app.use('/admin', adminRouter);
app.use(shopRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});