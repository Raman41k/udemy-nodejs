const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

const getHomePage = (req, res, next) => {
    const url = req.originalUrl;
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            documentTitle: 'Shop',
            url,
            products
        });
    }).catch((err) => {
        console.log(err)
    })
};

const getIndexPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            documentTitle: 'Shop',
            url,
            products
        });
    }).catch((err) => {
        console.log(err)
    });
}

const getProductsPage = (req, res, next) => {
    const url = req.originalUrl;
    Product.findAll().then(products => {
        res.render('shop/index', {
            documentTitle: 'Products',
            url,
            products
        });
    }).catch((err) => {
        console.log(err)
    });
};

const getProductPage = (req, res, next) => {
    const url = req.originalUrl;
    const productId = req.params.productId;

    Product.findByPk(productId)
        .then(product => {
        res.render('shop/product-details', {
            documentTitle: 'Product:' + product.title,
            url,
            product
        });
    }).catch((err) => {
        console.log(err)
    })
};

const getCartPage = (req, res, next) => {
    const url = req.originalUrl;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        documentTitle: 'Cart',
                        url,
                        products
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
}

const postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    req.user.getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({
                where: {
                    id: productId
                }
            })
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
                newQuantity = product.cartItem.quantity + 1;
            }

            return Product.findByPk(productId)
                .then(product => {
                    return fetchedCart.addProduct(product, {
                        through: {
                            quantity: newQuantity,
                        }
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err)
        })
}

const postDeleteItemFromCart = (req, res, next) => {
    const {product_id} = req.body;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: product_id
                }
            })
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err)
        })
}

const getOrdersPage = (req, res, next) => {
    const url = req.originalUrl;
    req.user.getOrders({
        include: ['products']
    })
        .then(orders => {
            console.log(orders.orderItem)
            res.render('shop/orders', {
                documentTitle: 'Orders',
                url,
                orders
            });
        })
        .catch(err => {
            console.log(err)
        })
}

const getCheckoutPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('shop/checkout', {
        documentTitle: 'Checkout',
        url
    });
};

const postOrder = (req, res, next) => {
    const url = req.originalUrl;
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = {quantity: product.cartItem.quantity};
                        return product;
                    }));
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .then(() => {
            return fetchedCart.setProducts(null);
        })
        .then((result) => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err)
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
    postDeleteItemFromCart,
    postOrder
}