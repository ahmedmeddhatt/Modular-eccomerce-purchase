const orderModel = require('../models/orderModel');
const productModel = require('../../product/models/productModel');
const customerModel = require('../../customer/models/customerModel');

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json({
            message: "Orders retrieved successfully",
            length: orders.length,
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: 'fail',
            error: err.message
         });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderModel.getOrderById(id);
        if (order) {
            res.status(200).json({
                message: "Order retrieved successfully",
                data: order
            });
        } else {
            res.status(404).json({ 
                status: 'fail',
                message: 'Order not found' 
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: 'fail',
            error: err.message
         });
    }
};

const createOrder = async (req, res) => {
    const {customerId, productId, quantity, totalAmount, orderStatus } = req.body;
    try {
        console.log(productId);
    const Customer = await customerModel.getCustomerById(customerId);
    const Product = await productModel.getProductById(productId);
    if (!Product) {
        res.status(404).json({
            status: "fail",
            message: 'Product not found!'
        })            
    } else if(!Customer){
        res.status(404).json({
            status: 'fail',
            message: 'Customer not found'
        })
    } else {
        const order = await orderModel.createOrder({
            customer_id: customerId,
            product_id: productId,
            quantity,
            total_amount: totalAmount,
            order_status: orderStatus
        });

        // return all the order details
        order.customer = Customer.name;
        order.email = Customer.email;
        order.phone = Customer.phone;
        order.product = Product.name;
        order.description = Product.description;
        order.price = Product.price;
        res.status(201).json({
            message: "Order created successfully",
            data: order
        });
     }   
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: 'fail',
            error: err.message
         });
    }
};


const updateOrder = async (req, res) => {
    const { id } = req.params;
    const {customerId, productId, quantity, totalAmout, orderStatus} = req.body;
    try {
        const order = await 
        orderModel.updateOrder(id, {customerId, productId, quantity, totalAmout, orderStatus});
        if (order) {
            res.status(200).json({
                message: "Order retrieved successfully",
                data: order
            });
        } else {
             res.status(404).json({ 
                status: 'fail',
                message: 'Order not found' 
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: 'fail',
            error: err.message
         });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {

        const order = await orderModel.getOrderById(id);
        if (order) {
            // delete order
            await orderModel.deleteOrder(id);
            res.status(200).json({
                message: "Order deleted successfully"
            });
        } else {
            res.status(404).json({ 
                status: 'fail',
                message: 'Order not found' 
            });
        };
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: 'fail',
            error: err.message
         });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
