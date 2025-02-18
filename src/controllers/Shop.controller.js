const {Product} = require("../models/Product.model");

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
    res.render('shop/products', {
        documentTitle: 'Products',
        url
    });
};

const getCartPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('shop/cart', {
        documentTitle: 'Cart',
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
    getCheckoutPage
}