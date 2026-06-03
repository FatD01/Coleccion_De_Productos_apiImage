const express = require('express');
const enrutador = express.Router();
const controladorProductos = require('../controllers/productosController');

enrutador.get('/', controladorProductos.obtenerTodosLosProductos);
enrutador.get('/:id', controladorProductos.obtenerProductoPorId);
enrutador.post('/', controladorProductos.crearProducto);
enrutador.put('/:id', controladorProductos.actualizarProducto);
enrutador.delete('/:id', controladorProductos.eliminarProducto);

module.exports = enrutador;
