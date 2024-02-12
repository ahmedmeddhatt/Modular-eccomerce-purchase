const express = require('express');
const payment = require('../controllers/payment-controller');

const router = express.Router();

router.get('/payment-details/', payment.getAllPayments);
router.get('/payment-details/:paymentId', payment.getPaymentById);
router.get('/buy', payment.createPayment);

module.exports = router;
