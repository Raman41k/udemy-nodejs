const express = require('express');

const { getHomePage, get404Page} = require('../controllers/App.controller');
const router = express.Router();

router.get('/', getHomePage);
router.get('*' ,get404Page)

module.exports = router;