const express = require('express');
const router = express.Router();

const {get404Page} = require("../controllers/App.controller");

router.get('*' ,get404Page);

module.exports = router;