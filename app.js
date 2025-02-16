const express =  require('express');
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require('express-handlebars');

const app = express();
const shopRouter = require('./src/routes/Shop.routes');
const adminRouter = require('./src/routes/Admin.routes');

//Setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'app/src/views/ejs'));

//Setup handlebars
// const handlebars = hbs.create({
//     extname: '.hbs',
//     layoutsDir: path.join(__dirname, '..', 'app/src/views/layouts'),
//     partialsDir: path.join(__dirname, '..', 'app/src/views/layouts'),
//     defaultLayout: 'main-layout.hbs',
//     helpers: {
//         eq: function(a, b) {
//             return a === b;
//         },
//     }
// });
//
// app.engine('hbs', handlebars.engine);
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, '..', "app/src/views/handlebars"));

// Setup for pug engine
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, '..', "app/src/views/pug"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './src/public')));
app.use('/admin', adminRouter);
app.use(shopRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});