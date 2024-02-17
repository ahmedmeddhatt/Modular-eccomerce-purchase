const cartModel = require('../models/cartModel');
const productModel = require('../../product/models/productModel');
const customerModel = require('../../customer/models/customerModel');
const db = require('../../db');

const getAllCarts = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const carts = await cartModel.getAllCarts(dbConnection);
        res.status(200).json({
            message: "Carts retrieved successfully",
            length: carts.length,
            data: carts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 'fail',
            message: error.message 
        });
    }
};

const getCartById = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const id = parseInt(req.params.id);
        const cart = await cartModel.getCartById(id, dbConnection);
        if (cart) {
            res.status(200).json({
                message: "Cart retrieved successfully",
                data: cart
            });
        } else {
            res.status(404).json({ 
                status: 'fail',
                message: `Cart with ID ${id} not found` 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 'fail',
            message: error.message 
        });
    }
};

const createCart = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const {customerId, productId, quantity} = req.body;

        const Customer = await customerModel.getCustomerById(customerId, dbConnection);
        const Product = await productModel.getProductById(productId, dbConnection);
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
        const cart = await cartModel.createCart({
            customer_id: customerId,
            product_id: productId,
            quantity
        }, dbConnection);
        res.status(201).json({
            message: "Cart created successfully",
            data: cart
        });
    };
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 'fail',
            message: error.message 
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const id = parseInt(req.params.id);
        const {customerId, productId, quantity} = req.body;
        const cart = await cartModel.updateCart(id, {
            customer_id: customerId,
            product_id: productId,
            quantity
        }, dbConnection);
        if (cart) {
            res.status(201).json({
                message: "Cart retrieved successfully",
                data: cart
            });
        } else {
            res.status(404).json({ 
                status: 'fail',
                message: `Cart with ID ${id} not found` 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 'fail',
            message: error.message 
        });
    }
};

const deleteCart = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const {id} = req.params;
        const cart = await cartModel.getCartById(id, dbConnection);
        if (cart) {
            // delete the cart
            await cartModel.deleteCart(id, dbConnection);
            res.status(204).json({
                message: "Cart deleted successfully"
            });
        } else {
            res.status(404).json({ 
                status: 'fail',
                message: `Cart with ID ${id} not found` 
            });
        };
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 'fail',
            message: error.message 
        });
    }
};

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart,
};
