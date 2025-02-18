const express = require('express');
const router = express.Router();

const { getProductPage, postAddProduct} = require("../controllers/Products.controller");

router.get('/add-product', getProductPage);
router.post('/add-product', postAddProduct);

module.exports = router;