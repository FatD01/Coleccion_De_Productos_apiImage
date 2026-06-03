require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const iniciarBD = require('./src/models/init');
const rutasProductos = require('./src/routes/productos');
const middlewareError = require('./src/middlewares/errorMiddleware');

const app = express();
const PUERTO = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/productos', rutasProductos);

app.use(middlewareError);

async function iniciarServidor() {
    console.log('Iniciando Base de Datos...');
    await iniciarBD();
    
    app.listen(PUERTO, () => {
        console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
    });
}

iniciarServidor();
