const paypalService = require('../services/paymentService');
const db = require('../../db');

const getAllPayments = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
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
        const dbConnection = await db.getDBConnection();
        const paymentId = req.params.paymentId;
        const payment = await paypalService.getPaymentByIdService(paymentId, dbConnection);
        if(payment){
            res.status(200).json({
                status: 'success',
                data: payment
            })
        } else {
            res.status(404).json({
                status: 'Fail',
                message: 'Payment not found!'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Fail',
            error: err.message
        })}
    
    
};



const createPayment = async (req, res) => {
    const dbConnection = await db.getDBConnection();
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
        const additionalFields = {
            payment_method: req.body.payment_method,
            name: req.body.name,
            price: req.body.price,
            currency: req.body.currency,
            quantity: req.body.quantity,
            description: req.body.description,
        };

        const paypalPayment = await paypalService.createPaypalPaymentService(payment, dbConnection);

        const storedPayment = await paypalService.storePaymentInDatabase(
            paypalPayment,
            additionalFields,
            dbConnection
        );

        res.status(200).json({
            status: 'success',
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
