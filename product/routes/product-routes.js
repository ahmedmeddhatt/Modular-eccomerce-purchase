// routes/product-routes.js
const express = require('express');
const router = express.Router();
const createProductController = require('../controllers/product-controller');

const productModel = require('../models/productModel');
const productController = createProductController(productModel);

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router.route('/:id')
    .get(productController.getProductById)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;
