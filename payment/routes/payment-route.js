const express = require('express');
const payment = require('../controllers/payment-controller');

const router = express.Router();


router.route('/payment-details/')
    .get(async (req, res) => {
        try {
            await payment.getAllPayments(req, res, req.dbConnection);
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
            await payment.getPaymentById(req, res, req.dbConnection);
        } catch (error){
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });

    
router.route('/buy')
    .post(async (req, res) => {
        try {
            await payment.createPayment(req, res, req.dbConnection);
        } catch (error){
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });


module.exports = router;
