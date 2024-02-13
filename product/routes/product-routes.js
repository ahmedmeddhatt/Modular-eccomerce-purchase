// routes/product-routes.js
const express = require('express');
const router = express.Router();
const createProductController = require('../controllers/product-controller');

const productModel = require('../models/productModel');
const productController = createProductController(productModel);
const db = require('../../db');


    router.route('/')
    .get(async (req, res) => {
        try {
            const dbConnection = db.getDBConnection();
            await productController.getAllProducts(req, res, dbConnection);
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
            const dbConnection = db.getDBConnection();
            await productController.createProduct(req, res, dbConnection);
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
            const dbConnection = db.getDBConnection();
            await productController.getProductById(req, res, dbConnection);
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
            const dbConnection = db.getDBConnection();
            await productController.updateProduct(req, res, dbConnection);
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
            const dbConnection = db.getDBConnection();
            await productController.deleteProduct(req, res, dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });

    
module.exports = router;
