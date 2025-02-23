const { Product } = require("../models/Product.model");
const { Cart } = require("../models/Cart.model");

const getHomePage = (req, res, next) => {
    const url = req.originalUrl;
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            documentTitle: 'Shop',
            url,
            products
        });
    });
};

const getIndexPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.fetchAll((products) => {
        res.render('shop/index', {
            documentTitle: 'Shop',
            url,
            products
        });
    });
}

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            documentTitle: 'Products',
            url,
            products
        });
    })
};

const getProductPage = (req, res, next) => {
    const url = req.originalUrl;
    const productId = req.params.productId;

    Product.fetchById(productId, (product) => {
        res.render('shop/product-details', {
            documentTitle: 'Product:' + product.title,
            url,
            product
        });
    })
};

const getCartPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('shop/cart', {
        documentTitle: 'Cart',
        url
    });
}

const postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchById(productId, (product) => {
        Cart.addProduct(productId, product.price)
    });
    res.redirect('/cart');
}

const getOrdersPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('shop/orders', {
        documentTitle: 'Orders',
        url
    });
}

const getCheckoutPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('shop/checkout', {
        documentTitle: 'Checkout',
        url
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
    postCart
}