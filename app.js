const express =  require('express');
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const app = express();
const shopRouter = require('./src/routes/Shop.routes');
const adminRouter = require('./src/routes/Admin.routes');
const appRouter = require('./src/routes/App.routes');

const Product = require('./src/models/Product.model');
const User = require('./src/models/User.model');
const Cart = require('./src/models/Cart.model');
const Order = require('./src/models/Order.model');
const CartItem = require('./src/models/Cart-item.model');
const OrderItem = require('./src/models/Order-item.model');

const sequelize = require('./src/util/database');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, '..', "app/src/views/"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './src/public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err)
        })
});

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(appRouter);

Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE",
});
Product.belongsToMany(Cart, {
    through: CartItem,
});

User.hasMany(Product);
User.hasMany(Order);
User.hasOne(Cart);

Cart.belongsTo(User);
Cart.belongsToMany(Product, {
    through: CartItem,
});

Order.belongsTo(User);
Order.belongsToMany(Product, {
    through: OrderItem,
});

sequelize
    .sync({ force: false })
    .then(() => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({
                name: 'Admin',
                email: 'admin@admin.com',
            });
        }
        return user;
    })
    .then((user) => {
        return user.getCart();
    })
    .then((existingCart) => {
        if (existingCart) {
            return existingCart;
        } else {
            return User.findByPk(1).then((user) => user.createCart());
        }
    })
    .then((cart) => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
