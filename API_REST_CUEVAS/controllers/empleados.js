const { httpResponse } = require('../utils/handleError')
const mensajes = require("../utils/mensajes");
var mysqlConnection = require("../config/conexion");
const GestionToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

const getEmpleados = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarToken(token);
        if (respuesta.statusCode == 200) {
            //var {celular} = req.params;
            var query = "SELECT * FROM empleado INNER JOIN usuario ON usuario.idUsuario = empleado.idUsuario;"

            mysqlConnection.query(query, (error, resultadoInicio) => {
                    if (error) {
                        httpResponse(res, error = { "code": 500, "detailsError": error })

                    } else if (resultadoInicio.length == 0) {
                        var sinRegistros = {
                            mensaje: mensajes.accionExitosa,
                            resultado: "Sin registros"
                        };

                        res.status(200).json(sinRegistros);

                    } else {
                        var empleaodosConsultados = {
                            mensaje: mensajes.accionExitosa,
                            resultadoInicio
                        }
                        res.status(200).json(empleaodosConsultados);

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

const getEmpleado = (req, res) => {

    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarToken(token);
        var { idUsuario } = req.params;
        console.log(idUsuario)

        if (respuesta.statusCode == 200) {

            var query = "SELECT * FROM empleado INNER JOIN usuario ON usuario.idUsuario = empleado.idUsuario where empleado.idUsuario = ?;"

            mysqlConnection.query(
                query, [idUsuario],
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

                        var usuarioConsultado = {
                            mensaje: mensajes.accionExitosa,
                            resultadoInicio
                        }

                        res.status(200).json(usuarioConsultado);

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

const registrarEmpleado = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador")

        if (respuesta.statusCode == 200){
            const empleado = req.body
            console.log(empleado)
            var comprobacion = 'SELECT count(idUsuario) as Comprobacion FROM dbcuevas.usuario WHERE nombre = ? AND primerApellido = ? AND segundoApellido = ? AND correo = ?'
            var query = "CALL registrarEmpleado(?,?,?,?,?,?,?,?,?);"

            mysqlConnection.query(comprobacion, [empleado.nombre, empleado.primerApellido, empleado.segundoApellido,
                empleado.correo, empleado.clave], (error, comp) =>{
                if (error){
                    httpResponse(res, error = { "code": 500, "detailsError": error })
                }else if (comp[0]['Comprobacion'] == 1){
                    httpResponse(res, error = { "code": 422, "detailsError": "Registro repetido" })
                }else{
                    mysqlConnection.query(query, [empleado.nombre, empleado.primerApellido, empleado.segundoApellido,
                        empleado.correo, empleado.clave, 2, empleado.fechaIngreso, empleado.idCargo, empleado.idSucursal
                    ], (error, resultadoRegistro) => {
                        if (error) {
                            httpResponse(res, error = { "code": 500, "detailsError": error })
                        } else {
                            console.log(resultadoRegistro)
                            var empleadoCreado
            
                            empleadoCreado = {
                                mensaje: mensajes.accionExitosa,
                                'insertado': resultadoRegistro['affectedRows']
                            }
            
                            res.status(201).json(empleadoCreado);
                        }
                    });
                }
            })

        } else if (respuesta.statusCode == 401) {
            res.status(401);
            httpResponse(res, error = { "code": 401, "detailsError": "" })
        } else {
            httpResponse(res, error = { "code": 500, "detailsError": "Hubo un problema al validar el token" })
        }
    } catch (error) {
        httpResponse(res, error = { "code": 500, "detailsError": exception.message })
    }
}

const modificarEmpleado = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador");
        const idUsuario = req.params
        const empleado = req.body

        if (respuesta.statusCode == 200) {
            console.log(empleado)
            var query = "CALL modificarEmpleado(?,?,?,?,?,?,?,?,?);"

            mysqlConnection.query(query, [empleado.nombre, empleado.primerApellido, empleado.segundoApellido,
                empleado.correo, empleado.clave, empleado.fechaIngreso, empleado.idCargo, empleado.idSucursal, idUsuario.idUsuario
            ], (error, resultadoActualizacion) => {
                if (error) {
                    httpResponse(res, error = { "code": 500, "detailsError": error })
                } else if (resultadoActualizacion.length == 0) {
                    console.log(
                        "¡Sin registros!"
                    );
                    httpResponse(res, error = { "code": 404, "detailsError": "" })
                } else {
                    console.log(resultadoActualizacion)
                    var empleadoModificado

                    var empleadoModificado = {
                        mensaje: mensajes.accionExitosa,
                        'insertado': resultadoActualizacion['affectedRows']
                    }

                    res.status(204).json(empleadoModificado);
                }
            })
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

module.exports = { getEmpleados, getEmpleado, registrarEmpleado, modificarEmpleado }