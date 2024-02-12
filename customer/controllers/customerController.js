const customersModel = require('../models/customerModel');

const getAllCustomers = async (req, res) => {
    try {
        const customers = await customersModel.getAllCustomers();
        res.status(200).json(customers);
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
        const customers = await customersModel.getCustomerById(id);
        if (customers) {
            res.status(200).json({
                status: 'success',
                length: customers.length,
                data: customers
            });
        } else {
            res.status(404).json({ 
                status: 'fail',
                message: error.message,
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
        const {name, email, phone, address} = req.body;
        const customer = await customersModel.createCustomer({name, email, phone, address});
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
        const id = req.params.id;
        const {name, email, phone, address} = req.body;
        const customer = await customersModel.updateCustomer(id, {name, email, phone, address});
        if (customer) {
            res.status(200).json({
                status: 'success',
                message: 'Customer updated successfully',
                data: customer
            });
        } else {
            res.status(404).json({ 
            status: 'fail',
            message: error.message
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
        const id = parseInt(req.params.id);
        const customer = await customersModel.getCustomerById(id);
        if (customer) {
            // delete customer
            await customersModel.deleteCustomer(id);
            res.status(200).json({
                status: 'success',
                message: 'Customer deleted successfully'
            });
   } else {
            res.status(404).json({ 
            status: 'fail',
            message: error.message
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
