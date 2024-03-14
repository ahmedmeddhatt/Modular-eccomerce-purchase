const express = require('express');
const router = express.Router();
const cartController = require('../controllers/userController');


router.route('/')
    .get(async (req, res) => {
        try {
            await cartController.getAllUsers(req, res, req.dbConnection);
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
            await cartController.createUser(req, res, req.dbConnection);
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
            await cartController.getUserById(req, res, req.dbConnection);
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
            await cartController.updateUser(req, res, req.dbConnection);
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
            await cartController.deleteUser(req, res, req.dbConnection);
        } catch (error) {
            console.error(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
        }
    });


module.exports = router;
