const paypalService = require('../services/paymentService');
const db = require('../../db');

const getAllPayments = async (req, res) => {
    try {
        const dbConnection = db.getDBConnection();
        const payments = await paypalService.getPaymentDetailsService(dbConnection);
        res.status(200).json({
            status: 'Success',
            length: payments.length,
            data: payments
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Fail',
            error: err.message
        })}
    
    
};
const getPaymentById = async (req, res) => {
    try {
        const dbConnection = db.getDBConnection();
        const paymentId = req.params.paymentId;
        const payments = await paypalService.getPaymentByIdService(paymentId, dbConnection);
        res.status(200).json({
            status: 'Success',
            data: payments
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Fail',
            error: err.message
        })}
    
    
};

const createPayment = async (req, res) => {
    const dbConnection = db.getDBConnection();
    const payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/error"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Rich dad poor dad",
                    "price": "250.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "250.00"
            },
            "description": "Financial Book"
        }]
    };
    try {
         const storedPayment = await paypalService.createPaypalPaymentService(payment, dbConnection);
         res.status(200).json({
            status: 'Success',
            data: storedPayment
        });
     } catch (err) {
        console.log(err);
        res.redirect('/error');
     }
};


module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment
};
