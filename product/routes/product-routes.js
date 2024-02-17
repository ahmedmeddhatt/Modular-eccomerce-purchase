// routes/product-routes.js
const express = require('express');
const router = express.Router();
const createProductController = require('../controllers/product-controller');

const productModel = require('../models/productModel');
const productController = createProductController(productModel);


    router.route('/')
    .get(async (req, res) => {
        try {
            await productController.getAllProducts(req, res, req.dbConnection);
        } catch (error){
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    })
    .post(async (req, res) => {
        try {
            await productController.createProduct(req, res, req.dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });


router.route('/:id')
    .get( async (req, res) => {
        try {
            await productController.getProductById(req, res, req.dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    })
    .put( async (req, res) => {
        try {
            await productController.updateProduct(req, res, req.dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    })
    .delete( async (req, res) => {
        try {
            await productController.deleteProduct(req, res, req.dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });

    
module.exports = router;
