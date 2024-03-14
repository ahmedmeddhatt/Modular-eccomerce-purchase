
const getAllusers = async (dbConnection) => {
    const query = `SELECT id, name, email, phone,  address, created_at, updated_at FROM users`;
    const { rows } = await dbConnection.query(query);
    return rows;
};

const getUserById = async (id, dbConnection) => {
    const query = `SELECT id, name, email, phone,  address, created_at, updated_at 
    FROM users WHERE id = $1`;
    const { rows } = await dbConnection.query(query, [id]);
    return rows[0];
};

const createUser = async (newCart, dbConnection) => {
    const { name, email, phone, address } = newCart;
    const query = `INSERT INTO users (name, email, phone, address) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, name, email, phone, address, created_at, updated_at`;
    const { rows } = await dbConnection.query(query, [name, email, phone, address]);
    return rows[0];
};

const updateUser = async (id, updatedCart, dbConnection) => {
    const { name, email, phone, address } = updatedCart;
    const query = 
    `UPDATE users SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5 
    RETURNING id, name, email, phone,  address, created_at, updated_at`;
    const { rows } = await dbConnection.query(query, [name, email, phone, address, id]);
    return rows[0];
};

const deleteUser = async (id, dbConnection) => {
    const query = `DELETE FROM users WHERE id = $1`;
     await dbConnection.query(query, [id]);
    
};

module.exports = {
    getAllusers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
