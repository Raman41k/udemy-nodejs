const Product = require("../models/Product.model");

const getHomePage = (req, res, next) => {
    const url = req.originalUrl;
    Product.getProducts().then(products => {
        res.render('shop/product-list', {
            documentTitle: 'Shop',
            url,
            products
        });
    }).catch((err) => {
        console.log(err)
    })
};

const getIndexPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.getProducts().then(products => {
        res.render('shop/product-list', {
            documentTitle: 'Shop',
            url,
            products
        });
    }).catch((err) => {
        console.log(err)
    });
}

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.getProducts().then(products => {
        res.render('shop/index', {
            documentTitle: 'Products',
            url,
            products
        });
    }).catch((err) => {
        console.log(err)
    });
};

const getProductPage = (req, res, next) => {
    const url = req.originalUrl;
    const productId = req.params.productId;

    Product.getProductById(productId)
        .then(product => {
            res.render('shop/product-details', {
                documentTitle: 'Product:' + product.title,
                url,
                product
            });
        })
        .catch(err => {
            console.log(err);
        })
};

const getCartPage = (req, res, next) => {
    const url = req.originalUrl;
    req.user.getCart().then((products) => {
        res.render('shop/cart', {
            documentTitle: 'Cart',
            url,
            products
        })
    }).catch(err => {
        console.log(err);
    })
}

const postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.getProductById(productId).then(product => {
        return req.user.addToCart(product)
    }).then(() => {
        res.redirect('/cart');
    });
}

const postDeleteItemFromCart = (req, res, next) => {
    const {product_id} = req.body;
    req.user.deleteItemFromCart(product_id)
        .then((cart) => {
            res.redirect('/cart');
        }).catch(err => {

    })
}

const getOrdersPage = (req, res, next) => {
    const url = req.originalUrl;
    req.user.getOrders().then(orders => {
            res.render('shop/orders', {
                documentTitle: 'Orders',
                url,
                orders
            });
        })
        .catch(err => {
            console.log(err)
        })
}

const getCheckoutPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('shop/checkout', {
        documentTitle: 'Checkout',
        url
    });
};

const postOrder = (req, res, next) => {
    const url = req.originalUrl;
    req.user.createOrder()
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err)
        });
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