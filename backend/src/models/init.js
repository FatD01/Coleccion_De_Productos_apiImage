const mysql = require('mysql2/promise');
require('dotenv').config();

async function iniciarBD() {
    try {
        console.log("Iniciando Base de Datos...");

        //para local y para aiven
        const configConexion = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
        };

        // SI ESTAMOS EN PRODUCCIÓN (AIVEN)
        if (process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com')) {
            configConexion.ssl = { rejectUnauthorized: false };
        }

        const conexion = await mysql.createConnection(configConexion);

        // En Aiven 'defaultdb' ya existe, el script solo la verificará
        await conexion.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de datos '${process.env.DB_NAME}' verificada/creada.`);

        await conexion.query(`USE \`${process.env.DB_NAME}\`;`);


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
        console.log('Tabla "productos" verificada/creada en la nube.');

        await conexion.end();
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        process.exit(1);
    }
}

module.exports = iniciarBD;