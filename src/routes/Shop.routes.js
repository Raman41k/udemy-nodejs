const express = require('express');
const router = express.Router();

const { getIndexPage,
    getProductsPage,
    getCartPage,
    getCheckoutPage,
    getOrdersPage,
    getProductPage,
    postCart,
    postDeleteItemFromCart,
    postOrder} = require('../controllers/Shop.controller');

router.get('/', getIndexPage);
router.get('/products', getProductsPage);
router.get('/products/:productId', getProductPage);
router.get('/cart', getCartPage);
router.get('/orders', getOrdersPage);
router.get('/checkout', getCheckoutPage);

router.post('/cart', postCart);
router.post('/cart-delete-item', postDeleteItemFromCart);
router.post('/create-order', postOrder);

module.exports = router;