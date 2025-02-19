const express = require('express');
const router = express.Router();

const { getProductPage,
    postAddProduct,
    getProductsPage} = require("../controllers/Admin.controller");

router.get('/add-product', getProductPage);
router.post('/add-product', postAddProduct);
router.get('/products', getProductsPage);

module.exports = router;