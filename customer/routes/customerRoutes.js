const express = require('express');
const router = express.Router();
const cartController = require('../controllers/customerController');


router.route('/')
    .get(async (req, res) => {
        try {
            await cartController.getAllCustomers(req, res, req.dbConnection);
        } catch (error){
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    })
    .post(async (req, res) => {
        try {
            await cartController.createCustomer(req, res, req.dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });


router.route('/:id')
    .get( async (req, res) => {
        try {
            await cartController.getCustomerById(req, res, req.dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    })
    .put( async (req, res) => {
        try {
            await cartController.updateCustomer(req, res, req.dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    })
    .delete( async (req, res) => {
        try {
            await cartController.deleteCustomer(req, res, req.dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });


module.exports = router;
