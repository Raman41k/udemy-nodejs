const Product = require("../models/Product.model");

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

    Product.getProductById(productId)
        .then(product => {
            res.render('admin/edit-product', {
                documentTitle: 'Edit product',
                url,
                product,
                editingMode
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

const postEditProduct = (req, res, next) => {
    const {product_id, title, imageUrl, price, description} = req.body;
    const updatedProduct = new Product(title, price, imageUrl, description)
    updatedProduct.update(product_id)
        .then(product => {
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log(err);
        })
};

const deleteProduct = (req, res, next) => {
    const {product_id} = req.body;
    const deletedProduct = new Product();
    deletedProduct.delete(product_id)
        .then(product => {
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log(err);
        })
}

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.getProducts()
        .then(products => {
            res.render('admin/products', {
                documentTitle: 'Add product',
                url,
                products
            });
        })
        .catch((err) => {
            console.log(err)
        });
};

const postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    const user = req.user;
    const product = new Product(title, price, imageUrl, description, user._id);
    product.save()
        .then(product => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports = {
    getProductPage,
    postAddProduct,
    getProductsPage,
    getEditProductPage,
    postEditProduct,
    deleteProduct
}