const db = require('../../db');

const getAllOrders = async (dbConnection) => {
    const query = `SELECT id, customer_id, product_id, quantity, total_amount, order_status,
     created_at, updated_at FROM orders`;
    const { rows } = await dbConnection.query(query);
    return rows;
};

const getOrderById = async (id, dbConnection) => {
    const query = `SELECT id, customer_id, product_id, quantity, total_amount, order_status,
    created_at, updated_at FROM orders WHERE id = $1`;
    const { rows } = await dbConnection.query(query, [id]);
    return rows[0];
};

const createOrder = async (newOrder, dbConnection) => {
    const { customer_id, product_id, quantity , total_amount, order_status} = newOrder;
    const query = `INSERT INTO orders (customer_id, product_id, quantity, total_amount, order_status)
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING customer_id, product_id, quantity, total_amount, order_status`;
    const { rows } = await dbConnection.query(query, [customer_id, product_id, quantity, total_amount, order_status]);
    return rows[0];
};

const updateOrder = async (id, updatedOrder, dbConnection) => {
    const { customer_id, product_id, quantity, total_amount, order_status } = updatedOrder;
    const query = `UPDATE orders SET customer_id = $1, product_id = $2, quantity = $3,
     total_amount $4, order_status $5 WHERE id = $6
    RETURNING customer_id, product_id, quantity, total_amount, order_status`;
    const { rows } = await 
    dbConnection.query(query, [customer_id, product_id, quantity, total_amount, order_status, id]);
    return rows[0];
};

const deleteOrder = async (id, dbConnection) => {
    const query = `DELETE FROM orders WHERE id = $1`;
    await dbConnection.query(query, [id]);
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
