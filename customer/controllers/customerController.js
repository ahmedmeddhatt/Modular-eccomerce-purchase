const customersModel = require('../models/customerModel');
const db = require('../../db');

const getAllCustomers = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const customers = await customersModel.getAllCustomers(dbConnection);
        res.status(200).json({
            status: 'success',
            length: customers.length,
            data: customers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 'fail',
            message: error.message
         });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        const dbConnection = await db.getDBConnection();
        const customer = await customersModel.getCustomerById(id, dbConnection);
        if (customer) {
            res.status(200).json({
                status: 'success',
                data: customer
            });
        } else {
            res.status(404).json({ 
                status: 'fail',
                message: `Can not find Id: ${id}`,
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

const createCustomer = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const {name, email, phone, address} = req.body;
        const customer = await customersModel.createCustomer({name, email, phone, address}, dbConnection);
        res.status(201).json({
            status: 'success',
            message: 'Customer created successfully',
            data: customer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 'fail',
            message: error.message
         });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const id = req.params.id;
        const {name, email, phone, address} = req.body;
        const customer = await customersModel.updateCustomer(id, {name, email, phone, address}, dbConnection);
        if (customer) {
            res.status(201).json({
                status: 'success',
                message: 'Customer updated successfully',
                data: customer
            });
        } else {
            res.status(404).json({ 
            status: 'fail',
            message: `Can not find Id: ${id}`,
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

const deleteCustomer = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const id = parseInt(req.params.id);
        const customer = await customersModel.getCustomerById(id, dbConnection);
        if (customer) {
            // delete customer
            await customersModel.deleteCustomer(id, dbConnection);
            res.status(204).json({
                status: 'success',
                message: 'Customer deleted successfully'
            });
   } else {
            res.status(404).json({ 
            status: 'fail',
            message: `Can not find Id: ${id}`,
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
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
