const orderModel = require('../models/orderModel');
const productModel = require('../../product/models/productModel');
const customerModel = require('../../customer/models/customerModel');
const db = require('../../db');

const getAllOrders = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const orders = await orderModel.getAllOrders(dbConnection);
        res.status(200).json({
            message: "success",
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
    let  totalAmount = 0, productsArr = [];
    const { id } = req.params;
    try {
        const dbConnection = await db.getDBConnection();
        const order = await orderModel.getOrderById(id, dbConnection);

        // Using Promise.all to wait for all async getProductById calls
        const productPromises = order.product_id.map(async (prod) => {
            // retrieving all the products with thier ids
            const Product = await productModel.getProductById(prod, dbConnection);
    
               if (Product && !isNaN(Number(Product.price))) {
                   let numPrice = Number(Product.price);
                   // calculate the total price
                   totalAmount += numPrice;
                   // store the products to return them in order details
                   productsArr.push (Product);           
            }
        });

            // retrieve the products promise
            await Promise.all(productPromises);

           // retrieving customer with customer id
           const Customer = await customerModel.getCustomerById(order.customer_id, dbConnection);
           if(!Customer){
            res.status(404).json({
                status: 'fail',
                message: 'Customer not found'
            })
        } 
           // retrieve all the order details
           order.customer = Customer.name;
           order.email = Customer.email;
           order.phone = Customer.phone;
           order.product = productsArr;
   
           if (order) {
            res.status(200).json({
                status: "success",
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
    let  totalAmount = 0, productsArr = [];
    const dbConnection = await db.getDBConnection();
    const {customerId, productId, quantity, orderStatus } = req.body;
    try {
     // retrieving customer with customer id
    const Customer = await customerModel.getCustomerById(customerId, dbConnection);

     // Using Promise.all to wait for all async getProductById calls
     const productPromises = productId.map(async (prod) => {
        // retrieving all the products with thier ids
        const Product = await productModel.getProductById(prod, dbConnection);

           if (Product && !isNaN(Number(Product.price))) {
               let numPrice = Number(Product.price);
               // calculate the total price
               totalAmount += numPrice;
               // store the products to return them in order details
               productsArr.push (Product);           
        }
    });

            // retrieve the products promise
            await Promise.all(productPromises);

    if(!Customer){
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
        }, dbConnection);

        // retrieve all the order details
        order.customer = Customer.name;
        order.email = Customer.email;
        order.phone = Customer.phone;
        order.product = productsArr;

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
    let  totalAmount = 0, productsArr = [];
    const dbConnection = await db.getDBConnection();
    const { id } = req.params;
    const {customerId, productId, quantity, orderStatus} = req.body;
    try {
   // retrieving customer with customer id
   const Customer = await customerModel.getCustomerById(customerId, dbConnection);

   // Using Promise.all to wait for all async getProductById calls
   const productPromises = productId.map(async (prod) => {
      // retrieving all the products with thier ids
      const Product = await productModel.getProductById(prod, dbConnection);

         if (Product && !isNaN(Number(Product.price))) {
             let numPrice = Number(Product.price);
             // calculate the total price
             totalAmount += numPrice;
             // store the products to return them in order details
             productsArr.push (Product);           
        }
    });

          // retrieve the products promise
          await Promise.all(productPromises);

    if(!Customer){
        res.status(404).json({
            status: 'fail',
            message: 'Customer not found'
        })
    } else {

        const order = await 
        orderModel.updateOrder(id, {
            customer_id: customerId,
            product_id: productId,
            quantity,
            total_amount: totalAmount,
            order_status: orderStatus
        }, dbConnection);

      // retrieve all the order details
      order.customer = Customer.name;
      order.email = Customer.email;
      order.phone = Customer.phone;
      order.product = productsArr;

        if (order) {
            res.status(201).json({
                status: 'success',
                message: "Order updated successfully",
                data: order
            });
        } else {
            res.status(404).json({ 
                status: 'fail',
                message: 'Order not found' 
            });
        };
   };   
   
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: 'fail',
            error: err.message
         });
    }
};

const deleteOrder = async (req, res) => {
    const dbConnection = await db.getDBConnection();
    const { id } = req.params;
    try {

        const order = await orderModel.getOrderById(id, dbConnection);
        if (order) {
            // delete order
            await orderModel.deleteOrder(id, dbConnection);
            res.status(204).json({
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
