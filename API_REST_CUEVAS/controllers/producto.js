var fileSystem = require('fs');
const ruta = require('path');
const { httpResponse } = require('../utils/handleError')
const mensajes = require("../utils/mensajes");
var mysqlConnection = require("../config/conexion");
const GestionToken = require("../config/generateToken");


const consultarProductos = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador");

        if (respuesta.statusCode == 200) {

            var query = "SELECT producto.*, fotografia.archivo FROM producto INNER JOIN fotografia ON producto.codigoBarras = fotografia.codigoBarras "

            mysqlConnection.query(
                query,
                (error, resultadoInicio) => {



                    if (error) {
                        httpResponse(res, error = { "code": 500, "detailsError": error })

                    } else if (resultadoInicio.length == 0) {
                        var sinRegistros = {
                            mensaje: mensajes.accionExitosa,
                            resultado: "Sin registros"
                        };

                        res.status(200).json(sinRegistros);

                    } else {

                        var productos = {
                            mensaje: mensajes.accionExitosa,
                            resultado: resultadoInicio
                        };

                        res.status(200).json(productos);

                    }
                }
            );

        } else if (respuesta.statusCode == 401) {
            res.status(401);
            httpResponse(res, error = { "code": 401, "detailsError": "" })

        } else {

            httpResponse(res, error = { "code": 500, "detailsError": "Hubo un problema al validar el token" })

        }

    } catch (exception) {
        httpResponse(res, error = { "code": 500, "detailsError": exception.message })

    }

}

const consultarCatalogoProducto = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");

        if (respuesta.statusCode == 200) {
            const { idSucursal, idProducto } = req.params
            var query = "SELECT productoCatalogo.*,categoria.nombreCategoria FROM productoCatalogo " +
                "INNER JOIN categoria ON productoCatalogo.idCatagoria = categoria.idCategoria WHERE idSucursal = ? AND estatus = 1 AND " +
                " productoCatalogo.codigoBarras = ?;"

            mysqlConnection.query(
                query, [idSucursal, idProducto],
                (error, resultadoInicio) => {
                    if (error) {
                        httpResponse(res, error = { "code": 500, "detailsError": error })

                    } else if (resultadoInicio.length == 0) {

                        var sinRegistros = {
                            mensaje: mensajes.accionExitosa,
                            resultado: "Sin registros"
                        };

                        res.status(200).json(sinRegistros);

                    } else {

                        var producto = {
                            mensaje: mensajes.accionExitosa,
                            resultado: resultadoInicio
                        };

                        res.status(200).json(producto);

                    }
                }
            );

        } else if (respuesta.statusCode == 401) {
            console.log("Token no valido en producto")
            res.status(401);
            httpResponse(res, error = { "code": 401, "detailsError": "" })

        } else {

            httpResponse(res, error = { "code": 500, "detailsError": "Hubo un problema al validar el token" })

        }

    } catch (exception) {
        httpResponse(res, error = { "code": 500, "detailsError": exception.message })

    }
}

const consultarCatalogoProductos = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");

        if (respuesta.statusCode == 200) {
            const { idSucursal } = req.params
            var query = "SELECT productoCatalogo.*,categoria.nombreCategoria FROM productoCatalogo " +
                "INNER JOIN categoria ON productoCatalogo.idCatagoria = categoria.idCategoria WHERE idSucursal = ? AND estatus = 1";

            mysqlConnection.query(
                query, [idSucursal],
                (error, resultadoInicio) => {
                    if (error) {
                        httpResponse(res, error = { "code": 500, "detailsError": error })

                    } else if (resultadoInicio.length == 0) {

                        var sinRegistros = {
                            mensaje: mensajes.accionExitosa,
                            resultado: "Sin registros"
                        };

                        res.status(200).json(sinRegistros);

                    } else {

                        var productos = {
                            mensaje: mensajes.accionExitosa,
                            resultado: resultadoInicio
                        };

                        res.status(200).json(productos);

                    }
                }
            );

        } else if (respuesta.statusCode == 401) {
            console.log("Token no valido en producto")
            res.status(401);
            httpResponse(res, error = { "code": 401, "detailsError": "" })

        } else {

            httpResponse(res, error = { "code": 500, "detailsError": "Hubo un problema al validar el token" })

        }

    } catch (exception) {
        httpResponse(res, error = { "code": 500, "detailsError": exception.message })

    }
}

// ? Registrar producto en general
const registrarProducto = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador");

        if (respuesta.statusCode == 200) {
            const producto = req.body;
            console.log(imagen)

            // ? Guardar imagen en carpeta  
            var imagen = req.file.filename;

            var query = "CALL nuevoProducto(?,?,?,?,?,?,?,?,?,?);"

            mysqlConnection.query(
                query, [producto.codigoBarras, producto.descripcion, producto.ciudad, producto.estatus,
                    producto.precioVenta, producto.precioCompra, producto.idCatagoria, producto.nombre, imagen, 2
                ],
                (error, resultadoRegistro) => {

                    console.log(resultadoRegistro);

                    if (error) {
                        httpResponse(res, error = { "code": 500, "detailsError": error })

                    } else {
                        var productoCreado;
                        console.log(resultadoRegistro)
                        productoCreado = {
                            mensaje: mensajes.accionExitosa,
                            'insertado': resultadoRegistro['affectedRows']
                        }
                        res.status(201).json(productoCreado);

                    }
                }
            );

        } else if (respuesta.statusCode == 401) {
            res.status(401);
            httpResponse(res, error = { "code": 401, "detailsError": "" })

        } else {

            httpResponse(res, error = { "code": 500, "detailsError": "Hubo un problema al validar el token" })

        }

    } catch (exception) {
        httpResponse(res, error = { "code": 500, "detailsError": exception.message })

    }

}

// ? Registrar producto en inventario de una sucursal
const agregarProductoInventario = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador");

        if (respuesta.statusCode == 200) {
            const { idSucursal, idProducto } = req.params;
            const productoInventario = req.body;

            var query = "INSERT INTO inventario(cantidad, idSucursal, idProducto, fechaCaducidad)" +
                "VALUES(?,?,?,?)"

            mysqlConnection.query(
                query, [productoInventario.cantidad, idSucursal, idProducto, productoInventario.fechaCaducidad],
                (error, resultadoInicio) => {
                    if (error) {
                        httpResponse(res, error = { "code": 500, "detailsError": error })

                    } else if (resultadoInicio.length == 0) {
                        var sinRegistros = {
                            mensaje: mensajes.accionExitosa,
                            resultado: "Sin registros"
                        };

                        res.status(200).json(sinRegistros);

                    } else {
                        var productoAgregado;
                        productoAgregado = {
                            mensaje: mensajes.accionExitosa,
                            'insertado': resultadoInicio['affectedRows']
                        }

                        res.status(201).json(productoAgregado);

                    }
                }
            );

        } else if (respuesta.statusCode == 401) {
            res.status(401);
            httpResponse(res, error = { "code": 401, "detailsError": "" })

        } else {

            httpResponse(res, error = { "code": 500, "detailsError": "Hubo un problema al validar el token" })

        }

    } catch (exception) {
        httpResponse(res, error = { "code": 500, "detailsError": exception.message })

    }

}

const modificarProducto = (req, res) => {

    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador");

        if (respuesta.statusCode == 200) {
            const { idProducto } = req.params;
            const producto = req.body;

            // ? Guardar imagen en carpeta  
            var imagen = req.file.filename;

            console.log("Modificar producto")
            console.log(imagen)
            console.log("Body")
            console.log()

            var query = "CALL editarProducto(?,?,?,?,?,?,?,?,?,?);"

            mysqlConnection.query(
                query, [idProducto, producto.descripcion, producto.ciudad, producto.estatus,
                    producto.precioVenta, producto.precioCompra, producto.idCatagoria, producto.nombre, imagen, 2
                ],
                (error, resultadoRegistro) => {
                    if (error) {
                        httpResponse(res, error = { "code": 500, "detailsError": error })

                    } else {
                        console.log(resultadoRegistro)
                        res.status(204).json();

                    }
                }
            );

        } else if (respuesta.statusCode == 401) {
            res.status(401);
            httpResponse(res, error = { "code": 401, "detailsError": "" })

        } else {

            httpResponse(res, error = { "code": 500, "detailsError": "Hubo un problema al validar el token" })

        }

    } catch (exception) {
        httpResponse(res, error = { "code": 500, "detailsError": exception.message })

    }

}

module.exports = { consultarProductos, consultarCatalogoProductos, consultarCatalogoProducto, registrarProducto, agregarProductoInventario, modificarProducto }