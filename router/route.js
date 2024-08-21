const express = require('express');
const router = express.Router();
const commonController = require('../controller/commonController.js')

router.get('/rates',commonController.rates);
router.get('/crude',commonController.crudeOil);
router.get('/argentina-bond-2020',commonController.argentinaBond);
router.get('/dl-bonds',commonController.dlBonds);

module.exports =router;