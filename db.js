const { Pool } = require('pg');
require('dotenv').config();

// Database connection

const getDBConnection = () => {

  const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
  });

  return pool;
};
  

module.exports = { getDBConnection };