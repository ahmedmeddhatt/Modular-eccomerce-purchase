const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controller');


router.route('/')
.get(async (req, res) => {
    try {
        await cartController.getAllCarts(req, res, req.dbConnection);
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
        await cartController.createCart(req, res, req.dbConnection);
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
        await cartController.getCartById(req, res, req.dbConnection);
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
        await cartController.updateCart(req, res, req.dbConnection);
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
        await cartController.deleteCart(req, res, req.dbConnection);
    } catch (error) {
        console.error(error);
    res.status(500).json({
        status: 'fail',
        message: error.message
    });
    }
});



module.exports = router;
