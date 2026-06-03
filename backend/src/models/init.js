const mysql = require('mysql2/promise');
require('dotenv').config();

async function iniciarBD() {
    try {
        const conexion = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        await conexion.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de datos '${process.env.DB_NAME}' verificada/creada.`);

        await conexion.query(`USE \`${process.env.DB_NAME}\`;`);

        // Crear tabla de productos
        const consultaCrearTabla = `
            CREATE TABLE IF NOT EXISTS productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                precio DECIMAL(10, 2) NOT NULL,
                stock INT NOT NULL DEFAULT 0,
                imagen_url VARCHAR(255)
            );
        `;
        await conexion.query(consultaCrearTabla);
        console.log('Tabla "productos" verificada/creada.');

        await conexion.end();
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        process.exit(1);
    }
}

module.exports = iniciarBD;
