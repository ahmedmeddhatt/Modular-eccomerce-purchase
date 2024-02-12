const db = require('../../db');

const getAllCustomers = async () => {
    const query = `SELECT id, name, email, phone, created_at, updated_at address FROM customers`;
    const { rows } = await db.query(query);
    return rows;
};

const getCustomerById = async (id) => {
    const query = `SELECT id, name, email, phone, created_at, updated_at 
    FROM customers WHERE id = $1`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

const createCustomer = async (newCart) => {
    const { name, email, phone, address } = newCart;
    const query = `INSERT INTO customers (name, email, phone, address) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, name, email, phone, created_at, updated_at`;
    const { rows } = await db.query(query, [name, email, phone, address]);
    return rows[0];
};

const updateCustomer = async (id, updatedCart) => {
    const { name, email, phone, address } = updatedCart;
    const query = 
    `UPDATE customers SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5 
    RETURNING id, name, email, phone, created_at, updated_at`;
    const { rows } = await db.query(query, [name, email, phone, address, id]);
    return rows[0];
};

const deleteCustomer = async (id) => {
    const query = `DELETE FROM customers WHERE id = $1`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
