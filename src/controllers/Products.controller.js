const { Product } = require('../models/Product.model');

const getHomePage = (req, res, next) => {
    const url = req.originalUrl;
    Product.fetchAll((products) => {
        res.render('shop', {
            documentTitle: 'Shop',
            url,
            products
        });
    });
};

const getProductPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('add-product', {
        documentTitle: 'Add product',
        url
    });
};

const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const product = new Product(title);
    product.save();
    return res.redirect('/');
}

module.exports = {
    getHomePage,
    getProductPage,
    postAddProduct,
}