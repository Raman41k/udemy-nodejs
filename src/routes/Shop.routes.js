const express = require('express');

const { get404Page} = require('../controllers/App.controller');
const { getHomePage} = require('../controllers/Products.controller');
const router = express.Router();

router.get('/', getHomePage);
router.get('*' ,get404Page)

module.exports = router;