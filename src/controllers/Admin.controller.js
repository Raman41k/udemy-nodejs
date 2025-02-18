const {Product} = require("../models/Product.model");

const getProductPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('admin/add-product', {
        documentTitle: 'Add product',
        url
    });
};

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('admin/products1', {
        documentTitle: 'Add product',
        url
    });
};

const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const product = new Product(title);
    product.save();
    return res.redirect('/');
};

module.exports = {
    getProductPage,
    postAddProduct,
    getProductsPage
}