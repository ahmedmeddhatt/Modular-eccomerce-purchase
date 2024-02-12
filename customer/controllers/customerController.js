const customersModel = require('../models/customerModel');

const getAllCustomers = async (req, res) => {
    try {
        const customers = await customersModel.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await customersModel.getCustomerById(id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: `Customer with ID ${id} not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createCustomer = async (req, res) => {
    try {
        const newCustomer = req.body;
        const customer = await customersModel.createCustomer(newCustomer);
        res.status(201).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCustomer = req.body;
        const customer = await customersModel.updateCustomer(id, updatedCustomer);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: `Customer with ID ${id} not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const customer = await customersModel.deleteCustomer(id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: `Customer with ID ${id} not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
