const express =  require('express');
const path = require("path");
const bodyParser = require("body-parser");


const app = express();
const shopRouter = require('./src/routes/Shop.routes');
const adminRouter = require('./src/routes/Admin.routes');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './src/public')));

app.use('/admin', adminRouter);
app.use(shopRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});