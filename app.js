// app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json());

// Routes
const customersRoutes = require('./customer/routes/customerRoutes');
const productRoutes = require('./product/routes/product-routes');
const carrtRoutes = require('./shopping-cart/routes/cart-routes');
const ordersRoutes = require('./order-management/routes/order-route');
const paymentRoutes = require('./payment/routes/payment-route');
const paypalService = require('./payment/services/paymentService');

// payment page
app.get('/payment', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

//success page
app.get('/success', async (req,res) => {
    // res.sendFile(__dirname + '/success.html');
    try {
        const paymentId = req.query.paymentId;

        const paymentDetails = await paypalService.getPaymentDetails(paymentId);
        res.status(200).json({
            status: 'uccess',
            data: paymentDetails
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Fail',
            error: err.message
        });
    }
});


// error page
app.get('/error', (req,res) => {
    res.sendFile(__dirname + '/error.html');
});

// Routes middleware
app.use('/api/customers', customersRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', carrtRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payment', paymentRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
