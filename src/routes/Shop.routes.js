const express = require('express');
const router = express.Router();

const { getIndexPage,
    getProductsPage,
    getCartPage,
    getCheckoutPage,
    getOrdersPage,
    getProductPage,
    postCart} = require('../controllers/Shop.controller');

router.get('/', getIndexPage);
router.get('/products', getProductsPage);
router.get('/products/:productId', getProductPage);
router.get('/cart', getCartPage);
router.post('/cart', postCart);
router.get('/orders', getOrdersPage);
router.get('/checkout', getCheckoutPage);

module.exports = router;