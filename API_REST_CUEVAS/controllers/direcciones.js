const { httpResponse } = require('../utils/handleError')
const mensajes = require("../utils/mensajes");
var mysqlConnection = require("../config/conexion");
const GestionToken = require("../config/generateToken");

const consultarDireccion = (req, res) => {

    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");

        if (respuesta.statusCode == 200) {
            const { idCliente, idDireccion } = req.params

            var query = "SELECT direccion.*,direccioncliente.idCliente FROM direccion " +
                "INNER JOIN direccioncliente ON direccioncliente.idDireccion = direccion.idDireccion " +
                " WHERE direccioncliente.idCliente = ? AND direccion.idDireccion = ?"

            mysqlConnection.query(
                query, [idCliente, idDireccion],
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

                        var direccionConsultada = {
                            mensaje: mensajes.accionExitosa,
                            respuesta: resultadoInicio
                        }

                        res.status(200).json(direccionConsultada);

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


const consultarDirecciones = (req, res) => {

    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");

        if (respuesta.statusCode == 200) {
            const { idCliente } = req.params

            var query = "SELECT direccion.*,direccioncliente.idCliente FROM direccion " +
                "INNER JOIN direccioncliente ON direccioncliente.idDireccion = direccion.idDireccion " +
                " WHERE direccioncliente.idCliente = ?"

            mysqlConnection.query(
                query, [idCliente],
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

                        var direcciones = {
                            mensaje: mensajes.accionExitosa,
                            respuesta: resultadoInicio
                        }

                        res.status(200).json(direcciones);

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


const registrarDireccion = (req, res) => {

    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");

        if (respuesta.statusCode == 200) {
            const { idCliente } = req.params;
            const direccion = req.body;

            var query = "INSERT INTO direccion" +
                "(calle, noExterior, noInterior,colonia,codigoPostal,municipio," +
                "entidadFederativa, latitud, longitud) VALUES(?,?,?,?,?,?,?,?,?)"

            mysqlConnection.query(
                query, [direccion.calle, direccion.noExterior, direccion.noInterior, direccion.colonia,
                    direccion.codigoPostal, direccion.municipio, direccion.entidadFederativa, direccion.latitud,
                    direccion.longitud
                ],
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

                        var idDireccion = resultadoInicio['insertId']

                        var query = "INSERT INTO direccioncliente" +
                            "(idDireccion, idCliente) VALUES(?,?)"
                        mysqlConnection.query(
                            query, [idDireccion, idCliente],
                            (error, resultadoInicio) => {
                                if (error) {
                                    httpResponse(res, error = { "code": 500, "detailsError": error })

                                } else if (resultadoInicio.length == 0) {
                                    console.log(
                                        "¡Sin registros!"
                                    );
                                    httpResponse(res, error = { "code": 404, "detailsError": "" })

                                } else {
                                    var direccionCreada = {
                                        mensaje: mensajes.accionExitosa,
                                        'insertado': resultadoInicio['affectedRows']
                                    };
                                    res.status(201).json(direccionCreada);


                                }
                            }
                        );


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

const modificarDireccion = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");

        if (respuesta.statusCode == 200) {
            const { idDireccion } = req.params
            const direccion = req.body
            console.log(direccion)

            var query = "UPDATE direccion " +
                "SET calle = ?, noExterior = ?, noInterior= ?,colonia = ?,codigoPostal = ?,municipio = ?," +
                "entidadFederativa = ?, latitud = ? , longitud = ? WHERE idDireccion = ?;"

            mysqlConnection.query(
                query, [direccion.calle, direccion.noExterior, direccion.noInterior, direccion.colonia,
                    direccion.codigoPostal, direccion.municipio, direccion.entidadFederativa, direccion.latitud,
                    direccion.longitud, idDireccion
                ],
                (error, resultadoInicio) => {
                    if (error) {
                        httpResponse(res, error = { "code": 500, "detailsError": error })

                    }else {

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

module.exports = { consultarDireccion, consultarDirecciones, registrarDireccion, modificarDireccion }