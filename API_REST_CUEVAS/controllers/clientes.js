const {httpResponse} = require('../utils/handleError')
const mensajes = require("../utils/mensajes");
var mysqlConnection = require("../config/conexion");
const GestionToken = require("../config/generateToken");

const getCliente = (req, res) => {
    
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarToken(token);
  
        if (respuesta.statusCode == 200) {
            var {celular} = req.params; 
            var query = "SELECT * FROM cliente INNER JOIN usuario ON usuario.idUsuario = cliente.idUsuario WHERE cliente.noCelular = ?;"    
          
          mysqlConnection.query(
            query,[celular],
            (error, resultadoInicio) => {
              if (error) {
                httpResponse(res, error = {"code" : 500, "detailsError" : error})
                
              }else if (resultadoInicio.length == 0) {
                console.log(
                  "¡Sin registros!"
                );
                httpResponse(res, error = {"code" : 404, "detailsError" : ""})
                
              }else {
      
                var usuarioConsultado = { 
                    mensaje: mensajes.accionExitosa,
                    resultadoInicio
                }
      
                res.status(200).json(usuarioConsultado);
                
              }
            }
          );
  
        }else if (respuesta.statusCode == 401) {
          res.status(401);
          httpResponse(res, error = {"code" : 401, "detailsError" : ""})
          
        } else {
  
          httpResponse(res, error = {"code" : 500, "detailsError" : "Hubo un problema al validar el token"})
  
        }   
  
      }catch(exception){       
          httpResponse(res, error = {"code" : 500, "detailsError" : exception.message})
  
      }

}

const registrarCliente = (req, res) => {
    try{
      const cliente = req.body;
      console.log(cliente)
      var query = 'CALL registrarCliente(?,?,?,?,?,?,?,?);'


      mysqlConnection.query(query, [cliente.nombre, cliente.primerApellido, cliente.segundoApellido, cliente.correo,
      cliente.clave,3, cliente.noCelular, cliente.fechaNacimiento], (error, resultadoRegistro) =>{
        if (error){
          httpResponse(res, error = {"code" : 500, "detailsError" : error})
        }else{
          console.log(resultadoRegistro)
          var clienteCreado;
          clienteCreado = {
            mensaje: mensajes.accionExitosa,
            'insertado' : resultadoRegistro['affectedRows']
          }

          res.status(201).json(clienteCreado);
        }
      })
    }catch(exception){
      httpResponse(res, error = {"code" : 500, "detailsError" : exception.message})
    }

}
    
// modificarPerfil 
const modificarCliente = (req, res) => {
    try{
      const token = req.headers["x-access-token"];
      var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
      
      if (respuesta.statusCode == 200){
        
      }
    }catch(exception){
      httpResponse(res, error = {"code" : 500, "detailsError" : exception.message})
    }

}

module.exports = {getCliente, registrarCliente, modificarCliente}