const express = require('express');
const payment = require('../controllers/payment-controller');
const db = require('../../db');

const router = express.Router();


router.route('/payment-details/')
    .get(async (req, res) => {
        try {
            const dbConnection = db.getDBConnection();
            await payment.getAllPayments(req, res, dbConnection);
        } catch (error){
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });


router.route('/payment-details/:paymentId')
    .get(async (req, res) => {
        try {
            const dbConnection = db.getDBConnection();
            await payment.getPaymentById(req, res, dbConnection);
        } catch (error){
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });

    
router.route('/buy')
    .get(async (req, res) => {
        try {
            const dbConnection = db.getDBConnection();
            await payment.createPayment(req, res, dbConnection);
        } catch (error){
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });


module.exports = router;
