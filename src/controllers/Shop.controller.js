const { Product } = require("../models/Product.model");
const { Cart } = require("../models/Cart.model");

const getHomePage = (req, res, next) => {
    const url = req.originalUrl;
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            console.log(rows);
            res.render('shop/product-list', {
                documentTitle: 'Shop',
                url,
                products: rows
            });
        })
        .catch(err => {
            console.log(err)
        });
};

const getIndexPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                documentTitle: 'Shop',
                url,
                products: rows
            });
        })
        .catch(err => {
            console.log(err)
        })
}

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.fetchAll()
        .then(([products, fieldData]) => {
            res.render('shop/product-list', {
                documentTitle: 'Products',
                url,
                products
            })
        })
        .catch(err => {
            console.log(err)
        })
};

const getProductPage = (req, res, next) => {
    const url = req.originalUrl;
    const productId = req.params.productId;

    Product.fetchById(productId)
        .then(([product, fieldData]) => {
            res.render('shop/product-details', {
                documentTitle: 'Product:' + product[0].title,
                url,
                product: product[0]
            });
        })
        .catch(err => {
            console.log(err)
        })
};

const getCartPage = (req, res, next) => {
    const url = req.originalUrl;
    Cart.getCart(cart => {
        Product.fetchAll()
            .then(([products]) => {
                let cartProducts = [];
                for (product of products) {
                    const cartProductData = cart.products.find(prod => prod.id === product.id);
                    if (cartProductData) {
                        product.quantity = cartProductData.qty;
                        cartProducts.push(product);
                    }
                }
                res.render('shop/cart', {
                    documentTitle: 'Cart',
                    url,
                    products: cartProducts
                });
            })
        .catch(err => {
            console.log(err)
        })
    });
}

const postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchById(productId)
        .then(([product]) => {
            Cart.addProduct(productId, product[0].price)
        })
        .catch(err => {
            console.log(err)
        })
    res.redirect('/cart');
}

const postDeleteItemFromCart = (req, res, next) => {
    const { product_id } = req.body;
    Product.fetchById(product_id)
        .then(([product]) => {
            Cart.deleteProductFromCart(product_id, product[0].price);
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/cart');
        })
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
    postCart,
    postDeleteItemFromCart
}