const express = require('express');
const router = express.Router();
const cartController = require('../controllers/customerController');
const db = require('../../db');


router.route('/')
    .get(async (req, res) => {
        try {
            const dbConnection = db.getDBConnection();
            await cartController.getAllCustomers(req, res, dbConnection);
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
            const dbConnection = db.getDBConnection();
            await cartController.createCustomer(req, res, dbConnection);
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
            const dbConnection = db.getDBConnection();
            await cartController.getCustomerById(req, res, dbConnection);
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
            const dbConnection = db.getDBConnection();
            await cartController.updateCustomer(req, res, dbConnection);
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
            const dbConnection = db.getDBConnection();
            await cartController.deleteCustomer(req, res, dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });


module.exports = router;
