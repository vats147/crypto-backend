const express = require('express');
const router = express.Router();
const commonController = require('../controller/commonController.js')

router.get('/rates',commonController.rates);
router.get('/crude',commonController.crudeOil);

module.exports =router;