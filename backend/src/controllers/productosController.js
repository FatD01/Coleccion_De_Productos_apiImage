const pool = require('../config/db');
const Joi = require('joi');
const axios = require('axios');

const esquemaProducto = Joi.object({
    nombre: Joi.string().max(255).required(),
    descripcion: Joi.string().allow('', null),
    precio: Joi.number().precision(2).positive().required(),
    stock: Joi.number().integer().min(0).required()
});

const esquemaActualizarProducto = Joi.object({
    nombre: Joi.string().max(255),
    descripcion: Joi.string().allow('', null),
    precio: Joi.number().precision(2).positive(),
    stock: Joi.number().integer().min(0)
}).min(1);

exports.obtenerTodosLosProductos = async (req, res, next) => {
    try {
        const [filas] = await pool.query('SELECT * FROM productos');
        res.json(filas);
    } catch (error) {
        next(error);
    }
};

exports.obtenerProductoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [filas] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        
        if (filas.length === 0) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            return next(error);
        }
        res.json(filas[0]);
    } catch (error) {
        next(error);
    }
};

exports.crearProducto = async (req, res, next) => {
    try {
        const { error, value } = esquemaProducto.validate(req.body);
        if (error) {
            const err = new Error(error.details[0].message);
            err.statusCode = 400;
            return next(err);
        }

        const { nombre, descripcion, precio, stock } = value;
        let imagen_url = null;

        try {
            const randomId = Math.floor(Math.random() * 20) + 1;
            const respuesta = await axios.get(`https://fakestoreapi.com/products/${randomId}`);
            if (respuesta.data && respuesta.data.image) {
                imagen_url = respuesta.data.image;
            } else {
                imagen_url = `https://picsum.photos/seed/${encodeURIComponent(nombre)}/400/400`;
            }
        } catch (apiError) {
            console.error('Error en API externa:', apiError.message);
            imagen_url = `https://picsum.photos/seed/${encodeURIComponent(nombre)}/400/400`;
        }

        const [resultado] = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, imagen_url]
        );

        res.status(201).json({
            id: resultado.insertId,
            nombre,
            descripcion,
            precio,
            stock,
            imagen_url
        });
    } catch (error) {
        next(error);
    }
};

exports.actualizarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { error, value } = esquemaActualizarProducto.validate(req.body);
        if (error) {
            const err = new Error(error.details[0].message);
            err.statusCode = 400;
            return next(err);
        }

        const [existente] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (existente.length === 0) {
            const err = new Error('Producto no encontrado');
            err.statusCode = 404;
            return next(err);
        }

        const campos = [];
        const valores = [];
        for (const [clave, val] of Object.entries(value)) {
            campos.push(`${clave} = ?`);
            valores.push(val);
        }
        
        valores.push(id);
        const consultaActualizar = `UPDATE productos SET ${campos.join(', ')} WHERE id = ?`;

        await pool.query(consultaActualizar, valores);

        res.json({
            mensaje: 'Producto actualizado con éxito',
            idActualizado: id
        });
    } catch (error) {
        next(error);
    }
};

exports.eliminarProducto = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [resultado] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        
        if (resultado.affectedRows === 0) {
            const err = new Error('Producto no encontrado');
            err.statusCode = 404;
            return next(err);
        }

        res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (error) {
        next(error);
    }
};
