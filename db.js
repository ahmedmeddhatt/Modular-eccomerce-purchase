const { Pool } = require('pg');
require('dotenv').config();

// Database connection

const getDBConnection = async () => {

  const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
  });

  // Check the connection
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release(); // Release the client back to the pool
    return pool;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
};
  

module.exports = { getDBConnection };