const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controller');
const db = require('../../db');



router.route('/')
.get(async (req, res) => {
    try {
        const dbConnection = db.getDBConnection();
        await cartController.getAllCarts(req, res, dbConnection);
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
        await cartController.createCart(req, res, dbConnection);
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
        await cartController.getCartById(req, res, dbConnection);
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
        await cartController.updateCart(req, res, dbConnection);
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
        await cartController.deleteCart(req, res, dbConnection);
    } catch (error) {
        console.error(error);
    res.status(500).json({
        status: 'fail',
        message: error.message
    });
    }
});



module.exports = router;
