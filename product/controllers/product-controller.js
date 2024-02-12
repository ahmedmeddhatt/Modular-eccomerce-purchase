// controllers/product-controller.js
module.exports = (productModel) => {
    // GET all products
    const getAllProducts = async (req, res) => {
        try {
            const products = await productModel.getAllProducts();
            res.status(200).json({
                status: 'Success',
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
            const id = req.params.id;
            const product = await productModel.getProductById(id);
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
            const {name, description, price} = req.body;

            if(!name || !description|| !price){
                res.status(404).json({
                    status: "fail",
                    message: 'Please add all the fields'
                })
            } else {
            const product = await productModel.createProduct({name, description, price});
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
            const id = req.params.id;
            const updatedProduct = req.body;
            const product = await productModel.updateProduct(id, updatedProduct);
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
            const id = req.params.id;
            const product = await productModel.deleteProduct(id);
            if (product) {
                res.status(200).json({
                    status: 'Product deleted successfully',
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

    return {
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};
