const usersModel = require('../models/userModel');
const db = require('../../db');

const getAllUsers = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const users = await usersModel.getAllUsers(dbConnection);
        res.status(200).json({
            status: 'success',
            length: users.length,
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 'fail',
            message: error.message
         });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const dbConnection = await db.getDBConnection();
        const user = await usersModel.getUserById(id, dbConnection);
        if (user) {
            res.status(200).json({
                status: 'success',
                data: user
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

const createUser = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const {name, email, phone, address} = req.body;
        const user = await usersModel.createUser({name, email, phone, address}, dbConnection);
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 'fail',
            message: error.message
         });
    }
};

const updateUser = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const id = req.params.id;
        const {name, email, phone, address} = req.body;
        const user = await usersModel.updateUser(id, {name, email, phone, address}, dbConnection);
        if (user) {
            res.status(201).json({
                status: 'success',
                message: 'User updated successfully',
                data: user
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

const deleteUser = async (req, res) => {
    try {
        const dbConnection = await db.getDBConnection();
        const id = parseInt(req.params.id);
        const user = await usersModel.getUserById(id, dbConnection);
        if (user) {
            // delete user
            await usersModel.deleteUser(id, dbConnection);
            res.status(204).json({
                status: 'success',
                message: 'User deleted successfully'
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
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
