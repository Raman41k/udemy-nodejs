const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

const getHomePage = (req, res, next) => {
    const url = req.originalUrl;

    Product.find().then(products => {
        res.render('shop/product-list', {
            documentTitle: 'Shop',
            url,
            products,
            isAuthenticated: req.session.isLoggedIn
        });
    }).catch((err) => {
        console.log(err)
    })
};

const getIndexPage = (req, res, next) => {
    const url = req.originalUrl;

    Product.find().then(products => {
        res.render('shop/product-list', {
            documentTitle: 'Shop',
            url,
            products,
            isAuthenticated: req.session.isLoggedIn
        });
    }).catch((err) => {
        console.log(err)
    });
}

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;

    Product.find()
        // .select('title price -_id description imageUrl')
        // .populate('userId')
        .then(products => {
        res.render('shop/index', {
            documentTitle: 'Products',
            url,
            products,
            isAuthenticated: req.session.isLoggedIn
        });
    }).catch((err) => {
        console.log(err)
    });
};

const getProductPage = (req, res, next) => {
    const url = req.originalUrl;
    const productId = req.params.productId;

    Product.findById(productId)
        .then(product => {
            res.render('shop/product-details', {
                documentTitle: 'Product:' + product.title,
                url,
                product,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })
};

const getCartPage = (req, res, next) => {
    const url = req.originalUrl;

    req.user
        .populate('cart.products.productId')
        .then((user) => {
        res.render('shop/cart', {
            documentTitle: 'Cart',
            url,
            products: user.cart.products,
            isAuthenticated: req.session.isLoggedIn
        })
    }).catch(err => {
        console.log(err);
    })
}

const postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId).then(product => {
        return req.user.addToCart(product)
    }).then(() => {
        res.redirect('/cart');
    });
}

const postDeleteItemFromCart = (req, res, next) => {
    const {product_id} = req.body;
    req.user
        .deleteItemFromCart(product_id)
        .then((cart) => {
            res.redirect('/cart');
        }).catch(err => {

    })
}

const getCheckoutPage = (req, res, next) => {
    const url = req.originalUrl;

    res.render('shop/checkout', {
        documentTitle: 'Checkout',
        url,
        isAuthenticated: req.session.isLoggedIn
    });
};

const postOrder = (req, res, next) => {
    const user = req.user;

    user.populate('cart.products.productId')
        .then(user => {
            const products = user.cart.products.map(product => {
                return {
                    quantity: product.quantity,
                    productData: { ...product.productId._doc }
                }
            })
            const order = new Order({
                user: {
                    name: user.name,
                    userId: user.id
                },
                products
            });
            return order.save();
        })
        .then(() => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err)
        });
}

const getOrdersPage = (req, res, next) => {
    const url = req.originalUrl;

    Order.find({"user.userId": req.user.id}).then(orders => {
        res.render('shop/orders', {
            documentTitle: 'Orders',
            url,
            orders,
            isAuthenticated: req.session.isLoggedIn
        });
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    getHomePage,
    getIndexPage,
    getProductsPage,
    getCartPage,
    getCheckoutPage,
    getOrdersPage,
    getProductPage,
    postCart,
    postDeleteItemFromCart,
    postOrder
}