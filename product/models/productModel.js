// productModel.js

const getAllProducts = async (dbConnection) => {
    const result = await 
    dbConnection.query(`SELECT id, name, description, price, created_at, updated_at FROM products`);
    return result.rows;
};

const getProductById = async (id, dbConnection) => {
    const result = await 
    dbConnection.query(`SELECT id, name, description, price, created_at, updated_at FROM products 
    WHERE id = $1`, [id]);
    return result.rows[0];
};

const createProduct = async (productData, dbConnection) => {
    const { name, price, description } = productData;
    const result = await dbConnection.query(`INSERT INTO products (name, price, description) 
    VALUES ($1, $2, $3) 
    RETURNING id, name, description, price, created_at, updated_at `, [name, price, description]);
    return result.rows[0];
};

const updateProduct = async (id, productData, dbConnection) => {
    const { name, price, description } = productData;
    const result = await dbConnection.query(`UPDATE products SET name = $1, description = $2, price = $3 
    WHERE id = $4 
    RETURNING id, name, description, price, created_at, updated_at`, [name, description, price, id]);
    return result.rows[0];
};

const deleteProduct = async (id, dbConnection) => {
    const result = await dbConnection.query(`DELETE FROM products WHERE id = $1`, [id]);
    return result.rows[0];
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
