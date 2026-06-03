const middlewareError = (err, req, res, next) => {
    console.error(err.stack);
    const codigoEstado = err.statusCode || 500;
    const mensaje = err.message || 'Error Interno del Servidor';

    res.status(codigoEstado).json({
        exito: false,
        mensaje: mensaje,
        pila: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = middlewareError;
