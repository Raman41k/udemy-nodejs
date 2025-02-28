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

    console.log(req.user)
    req.user.getProducts({
        where: {
            id: productId
        }
    }).then((products) => {
        const product = products[0];
        if (!product) return res.redirect('/');
        res.render('admin/edit-product', {
            documentTitle: 'Edit product',
            url,
            product: product.dataValues,
            editingMode
        });
    }).catch((err) => {
        console.log(err);
    })
};

const postEditProduct = (req, res, next) => {
    const { product_id, title, imageUrl, price, description } = req.body;

    Product.update({
            title,
            price,
            imageUrl,
            description
        },
        {
            where: {
                id: product_id
            }
        }
    )
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log(err);
        });
};

const deleteProduct = (req, res, next) => {
    const { product_id } = req.body;
    Product.destroy({
        where: {
            id: product_id,
        }
    }).then(() => {
        res.redirect('/admin/products');
    }).catch((err) => {
        console.log(err)
    })
}

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;
    req.user.getProducts()
        .then(products => {
        res.render('admin/products', {
            documentTitle: 'Add product',
            url,
            products
        });
    }).catch((err) => {
        console.log(err)
    })
};

const postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    req.user.createProduct({
        title,
        price,
        imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D',
        description,
    }).then(() => {
        res.redirect('/admin/products');
    })
    .catch((err) => {
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