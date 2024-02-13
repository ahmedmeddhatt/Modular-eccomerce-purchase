
const getAllCarts = async (dbConnection) => {
    const query = `SELECT id, customer_id, product_id, quantity, created_at, updated_at FROM carts`;
    const { rows } = await dbConnection.query(query);
    return rows;
};

const getCartById = async (id, dbConnection) => {
    const query = `SELECT id, customer_id, product_id, quantity, created_at, updated_at 
    FROM carts WHERE id = $1`;
    const { rows } = await dbConnection.query(query, [id]);
    return rows[0];
};

const createCart = async (newCart, dbConnection) => {
    const { customer_id, product_id, quantity } = newCart;
    const query = `INSERT INTO carts (customer_id, product_id, quantity) VALUES ($1, $2, $3) 
    RETURNING id, customer_id, product_id, quantity, created_at, updated_at`;
    const { rows } = await dbConnection.query(query, [customer_id, product_id, quantity]);
    return rows[0];
};

const updateCart = async (id, updatedCart, dbConnection) => {
    const { customer_id, product_id, quantity } = updatedCart;
    const query = `UPDATE carts SET customer_id = $1, product_id = $2, quantity = $3 WHERE id = $4 
    RETURNING id, customer_id, product_id, quantity, created_at, updated_at`;
    const { rows } = await dbConnection.query(query, [customer_id, product_id, quantity, id]);
    return rows[0];
};

const deleteCart = async (id, dbConnection) => {
    const query = `DELETE FROM carts WHERE id = $1`;
    const { rows } = await dbConnection.query(query, [id]);
    return rows[0];
};

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart,
};
