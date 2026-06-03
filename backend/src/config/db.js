require('dotenv').config();
const mysql = require('mysql2/promise');

const configPool = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
};


if (process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com')) {
    configPool.ssl = { rejectUnauthorized: false };
}

const pool = mysql.createPool(configPool);

module.exports = pool;