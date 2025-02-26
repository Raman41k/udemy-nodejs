const express = require('express');
const router = express.Router();

const { getProductPage,
    postAddProduct,
    getProductsPage,
    getEditProductPage,
    postEditProduct,
    deleteProduct} = require("../controllers/Admin.controller");

router.get('/add-product', getProductPage);
router.get('/products', getProductsPage);
router.get('/edit-product/:productId', getEditProductPage);

router.post('/add-product', postAddProduct);
router.post('/edit-product', postEditProduct);
router.post('/delete-product', deleteProduct);

module.exports = router;