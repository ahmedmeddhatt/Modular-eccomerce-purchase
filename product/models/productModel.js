// productModel.js

const pool = require(`../../db`);

const getAllProducts = async () => {
    const result = await 
    pool.query(`SELECT id, name, description, price FROM products`);
    return result.rows;
};

const getProductById = async (id) => {
    const result = await pool.query(`SELECT id, name, description, price FROM products 
    WHERE id = $1`, [id]);
    return result.rows[0];
};

const createProduct = async (productData) => {
    const { name, price, description } = productData;
    const result = await pool.query(`INSERT INTO products (name, price, description) 
    VALUES ($1, $2, $3) 
    RETURNING id, name, description, price`, [name, price, description]);
    return result.rows[0];
};

const updateProduct = async (id, productData) => {
    const { name, price, description } = productData;
    const result = await pool.query(`UPDATE products SET name = $1, description = $2, price = $3 
    WHERE id = $4 
    RETURNING id, name, description, price `, [name, description, price, id]);
    return result.rows[0];
};

const deleteProduct = async (id) => {
    const result = await pool.query(`DELETE FROM products WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
