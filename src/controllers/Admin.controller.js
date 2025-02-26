const { Product } = require("../models/Product.model");

const getProductPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('admin/edit-product', {
        documentTitle: 'Add product',
        url
    });
};

const getEditProductPage = (req, res, next) => {
    const url = req.originalUrl;
    const productId = req.params.productId;
    const editingMode = req.query.edit;

    if (!editingMode) return res.redirect('/');

    Product.fetchById(productId, product => {
        if (!product) return res.redirect('/');
        res.render('admin/edit-product', {
            documentTitle: 'Edit product',
            url,
            product,
            editingMode
        });
    })
};

const postEditProduct = (req, res, next) => {
    const { product_id, title, imageUrl, price, description } = req.body;
    const updatedProduct = new Product(product_id, title, imageUrl, description, price);
    updatedProduct.update();
    res.redirect('/admin/products');
};

const deleteProduct = (req, res, next) => {
    const { product_id } = req.body;
    const deletedProduct = new Product(product_id);
    deletedProduct.delete();
    res.redirect('/admin/products');
}

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
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    return res.redirect('/');
};

module.exports = {
    getProductPage,
    postAddProduct,
    getProductsPage,
    getEditProductPage,
    postEditProduct,
    deleteProduct
}