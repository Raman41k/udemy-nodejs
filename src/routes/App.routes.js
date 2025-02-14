const express = require('express');

const { getHomePage, getUsersPage} = require('../controllers/App.controller');
const { usersPageMiddleware, homePageMiddleware } = require('../middleware/App.middleware')

const router = express.Router();

router.get('/', homePageMiddleware, getHomePage);
router.get('/users', usersPageMiddleware, getUsersPage);

module.exports = router;