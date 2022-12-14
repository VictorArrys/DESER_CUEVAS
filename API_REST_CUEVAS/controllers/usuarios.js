const { httpResponse } = require('../utils/handleError')
const mensajes = require("../utils/mensajes");
var mysqlConnection = require("../config/conexion");
const GestionToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

const iniciarSesion = (req, res) => {

    const { correo, clave } = req.body;
    var query = "SELECT idUsuario, correo, tipo, nombre, primerApellido, segundoApellido FROM usuario WHERE correo = ? AND clave = ?";
    console.log("Body")
    console.log(req.body);

    // Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
    const rondasDeSal = 10;
    mysqlConnection.query(
        query, [correo, clave],
        (error, resultadoInicio) => {
            if (error) {
                httpResponse(res, error = { "code": 500, "detailsError": error })

            } else if (resultadoInicio.length == 0) {
                console.log(
                    "¡Credenciales incorrectas! Probablemente el usuario no exista o estan mal sus credenciales"
                );
                httpResponse(res, error = { "code": 404, "detailsError": "" })

            } else {

                var usuario = resultadoInicio[0];
                var tipoUsuario
                switch (usuario.tipo) {
                    case 1:
                        tipoUsuario = "Administrador";
                        break;
                    case 2:
                        tipoUsuario = "Empleado";
                        break;
                    case 3:
                        tipoUsuario = "Cliente";
                        break;

                }

                const payloadToken = {
                    idUsuario: usuario.idUsuario,
                    correo: usuario.correo,
                    tipo: tipoUsuario
                };

                var token = GestionToken.CrearToken(payloadToken);

                const infoUsuario = {
                    idUsuario: usuario.idUsuario,
                    nombre: usuario.nombre + ' ' + usuario.primerApellido + ' ' + usuario.segundoApellido,
                    correo: usuario.correo,
                    tipo: tipoUsuario,
                    token: token
                }

                console.log("¡Inicio sesión el usuario: " + mensajes.accionExitosa + usuario.nombre);
                const sesion = {
                    mensaje: mensajes.registroExitoso,
                    usuario: infoUsuario
                }
                res.setHeader("x-access-token", token);
                res.status(201).json(sesion);

            }
        }
    );

}

const consultarUsuarios = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador");

        if (respuesta.statusCode == 200) {
            var query = "SELECT * FROM usuario"

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

                        var usuariosConsultados = resultadoInicio;

                        res.status(200).json(usuariosConsultados);

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

// modificarPerfil 
const modificarUsuario = (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador");

        if (respuesta.statusCode == 200 && req.body.tipo == 2) {
            const { idUsuario } = req.params
            const usuarioModificado = req.body
            console.log(usuarioModificado)

            var query = "UPDATE usuario SET nombre = ?, primerApellido = ?, segundoApellido = ?, correo = ?, clave = ? WHERE idUsuario = ?; "

            mysqlConnection.query(
                query, [usuarioModificado.nombre, usuarioModificado.primerApellido, usuarioModificado.segundoApellido,
                    usuarioModificado.correo, usuarioModificado.clave, idUsuario
                ],
                (error, resultadoInicio) => {
                    if (error) {
                        httpResponse(res, error = { "code": 500, "detailsError": "Error en modificar debido a: " + error })

                    } else if (resultadoInicio.length == 0) {
                        var sinRegistros = {
                            mensaje: mensajes.accionExitosa,
                            resultado: "Sin registros"
                        };

                        res.status(200).json(sinRegistros);

                    } else {
                        res.status(204)
                        res.send();

                    }
                }
            );

        } else if (req.body.tipo !== 2) {
            res.status(403);
            httpResponse(res, error = { "code": 403, "detailsError": "Acceso no autorizado para editar otro tipo de usuario que no sea empleado" })
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

module.exports = { consultarUsuarios, modificarUsuario, iniciarSesion }