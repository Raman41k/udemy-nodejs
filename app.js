const express =  require('express');
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const shopRouter = require('./src/routes/Shop.routes');
const adminRouter = require('./src/routes/Admin.routes');
const appRouter = require('./src/routes/App.routes');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, '..', "app/src/views/"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './src/public')));
app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(appRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});