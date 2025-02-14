const express = require('express');
const router = express.Router();

const { addProductPage, addProduct} = require("../controllers/App.controller");

router.get('/add-product', addProductPage);
router.post('/add-product', addProduct);

module.exports = router;