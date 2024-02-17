// controllers/product-controller.js

const db = require('../../db');

module.exports = (productModel) => {
    // GET all products
    const getAllProducts = async (req, res) => {
        try {
            const dbConnection = await db.getDBConnection();
            const products = await productModel.getAllProducts(dbConnection);
            res.status(200).json({
                status: 'success',
                length: products.length,
                data: products
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    };

    // GET single product by ID
    const getProductById = async (req, res) => {
        try {
            const dbConnection = await db.getDBConnection();
            const id = req.params.id;
            const product = await productModel.getProductById(id, dbConnection);
            if (product) {
                res.status(200).json({
                    status: 'Success',
                    data: product
                });
            } else {
                res.status(404).json({
                    status: "fail",
                    message: 'Product not found!'
                })            
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ 
                status: 'fail',
                error: err.message
             });
        }
    };

    // POST new product
    const createProduct = async (req, res) => {
        try {
            const dbConnection = await db.getDBConnection();
            const {name, description, price} = req.body;

            if(!name || !description|| !price){
                res.status(404).json({
                    status: "fail",
                    message: 'Please add all the fields'
                })
            } else {
            const product = await productModel.createProduct({name, description, price}, dbConnection);
            res.status(201).json({
                status: 'Product created successfully',
                data: product
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

    // PUT update existing product
    const updateProduct = async (req, res) => {
        try {
            const dbConnection = await db.getDBConnection();
            const id = req.params.id;
            const {name, description, price} = req.body;
            const product = await productModel.updateProduct(id, {name, description, price}, dbConnection);
            if (product) {
                res.status(201).json({
                    status: 'Product updated successfully',
                    data: product
                });            
            } else {
                    res.status(404).json({
                        status: "fail",
                        message: 'Product not found!'
                    })
                }
        } catch (err) {
            console.error(err);
            res.status(500).json({ 
                status: 'fail',
                error: err.message
             });
        }
    };

    // DELETE product
    const deleteProduct = async (req, res) => {
        try {
            const dbConnection = await db.getDBConnection();
            const id = req.params.id;
            const product = await productModel.getProductById(id, dbConnection);
            if (product) {
               // delete product
            await productModel.deleteProduct(id, dbConnection);
            res.status(204).json({
                status: 'Product deleted successfully',
            });
            } else {
                res.status(404).json({
                    status: "fail",
                    message: 'Product not found!'
                })            
            };
           
        } catch (err) {
            console.error(err);
            res.status(500).json({ 
                status: 'fail',
                error: err.message
             });
        }
    };

    return {
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};
