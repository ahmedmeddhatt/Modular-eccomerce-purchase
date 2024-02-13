
const getAllCustomers = async (dbConnection) => {
    const query = `SELECT id, name, email, phone,  address, created_at, updated_at FROM customers`;
    const { rows } = await dbConnection.query(query);
    return rows;
};

const getCustomerById = async (id, dbConnection) => {
    const query = `SELECT id, name, email, phone,  address, created_at, updated_at 
    FROM customers WHERE id = $1`;
    const { rows } = await dbConnection.query(query, [id]);
    return rows[0];
};

const createCustomer = async (newCart, dbConnection) => {
    const { name, email, phone, address } = newCart;
    const query = `INSERT INTO customers (name, email, phone, address) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, name, email, phone, address, created_at, updated_at`;
    const { rows } = await dbConnection.query(query, [name, email, phone, address]);
    return rows[0];
};

const updateCustomer = async (id, updatedCart, dbConnection) => {
    const { name, email, phone, address } = updatedCart;
    const query = 
    `UPDATE customers SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5 
    RETURNING id, name, email, phone,  address, created_at, updated_at`;
    const { rows } = await dbConnection.query(query, [name, email, phone, address, id]);
    return rows[0];
};

const deleteCustomer = async (id, dbConnection) => {
    const query = `DELETE FROM customers WHERE id = $1`;
     await dbConnection.query(query, [id]);
    
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
