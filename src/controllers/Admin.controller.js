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

    Product.findById(productId)
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
    Product.findByIdAndUpdate(product_id, {
        $set: {
            title,
            price,
            description,
            imageUrl,
        }
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(err => {
        console.log('Error by updating product', err);
    })
};

const deleteProduct = (req, res, next) => {
    const {product_id} = req.body;
    Product.findByIdAndDelete(product_id).then(() => {
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    })
}

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.find()
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
    const product = new Product({title, price, description, imageUrl, userId: user._id});
    product.save()
        .then(product => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log('Error to create product', err);
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