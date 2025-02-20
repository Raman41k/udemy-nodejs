const { Product } = require("../models/Product.model");

const getProductPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('admin/add-product', {
        documentTitle: 'Add product',
        url
    });
};

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.fetchAll(products => {
        res.render('admin/products', {
            documentTitle: 'Add product',
            url,
            products
        });
    })
};

const postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    return res.redirect('/');
};

module.exports = {
    getProductPage,
    postAddProduct,
    getProductsPage
}