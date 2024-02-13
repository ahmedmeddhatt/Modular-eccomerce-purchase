const express = require('express');
const orderController = require('../controllers/order-controller');
const db = require('../../db');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const dbConnection = db.getDBConnection();
            await orderController.getAllOrders(req, res, dbConnection);
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
            await orderController.createOrder(req, res, dbConnection);
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
            await orderController.getOrderById(req, res, dbConnection);
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
            await orderController.updateOrder(req, res, dbConnection);
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
            await orderController.deleteOrder(req, res, dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });

    
module.exports = router;
