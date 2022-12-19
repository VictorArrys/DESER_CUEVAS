const { httpResponse } = require('../utils/handleError')
const mensajes = require("../utils/mensajes");
var mysqlConnection = require("../config/conexion");
const GestionToken = require("../config/generateToken");

const consultarCategorias = (req, res) => {

    try {
        const token = req.headers["x-access-token"];
        console.log("El token")
        console.log(token)
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");

        if (respuesta.statusCode == 200) {

            var query = "SELECT * FROM categoria"

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

                        var resultadoConsulta = {
                            mensaje: mensajes.accionExitosa,
                            resultadoInicio
                        };

                        res.status(200).json(resultadoConsulta);

                    }
                }
            );

        } else if (respuesta.statusCode == 401) {
            res.status(401);
            httpResponse(res, error = { "code": 401, "detailsError": "Sin token o sin autorizacion" })

        } else {

            httpResponse(res, error = { "code": 500, "detailsError": "Hubo un problema al validar el token" })

        }

    } catch (exception) {
        httpResponse(res, error = { "code": 500, "detailsError": exception.message })

    }

}

module.exports = { consultarCategorias }