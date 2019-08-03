const express = require('express');
const router = express.Router();
const {checkAuth, checkAdmin} = require('../controllers/auth');
const {createProduct} = require('../controllers/product');


router.get('/product/:productId');
router.post('/product/create', checkAuth, checkAdmin, createProduct)

// router.param('productId', productById);

module.exports = router