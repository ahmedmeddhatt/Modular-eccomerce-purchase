const paypalService = require('../services/paymentService');

const getAllPayments = async (req, res) => {
    try {
        const payments = await paypalService.getPaymentDetailsService();
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
        const paymentId = req.params.paymentId;
        const payments = await paypalService.getPaymentByIdService(paymentId);
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
         const storedPayment = await paypalService.createPaypalPaymentService(payment);
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
