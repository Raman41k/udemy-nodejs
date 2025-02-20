const express = require('express');
const router = express.Router();

const { getIndexPage,
    getProductsPage,
    getCartPage,
    getCheckoutPage,
    getOrdersPage} = require('../controllers/Shop.controller');

router.get('/', getIndexPage);
router.get('/products', getProductsPage);
router.get('/cart', getCartPage);
router.get('/orders', getOrdersPage);
router.get('/checkout', getCheckoutPage);

module.exports = router;