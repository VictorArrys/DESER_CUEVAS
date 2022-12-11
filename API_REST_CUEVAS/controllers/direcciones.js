const {httpResponse} = require('../utils/handleError')

const consultarDireccion = (req, res) => {
    
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
  
        if (respuesta.statusCode == 200) {
          const { idUsuario, idDireccion } = req.params
          
          var query = ""    
          
          mysqlConnection.query(
            query,
            (error, resultadoInicio) => {
              if (error) {
                httpResponse(res, error = {"code" : 500, "detailsError" : error})
                
              }else if (resultadoInicio.length == 0) {
                console.log(
                  "¡Sin registros!"
                );
                httpResponse(res, error = {"code" : 404, "detailsError" : ""})
                
              }else {
      
                var usuariosConsultados = resultadoInicio;
      
                res.status(200).json(mensajes.accionExitosa,usuariosConsultados);
                
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


const consultarDirecciones = (req, res) => {
    
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
  
        if (respuesta.statusCode == 200) {
          const { idUsuario } = req.params
          
          var query = ""    
          
          mysqlConnection.query(
            query,
            (error, resultadoInicio) => {
              if (error) {
                httpResponse(res, error = {"code" : 500, "detailsError" : error})
                
              }else if (resultadoInicio.length == 0) {
                console.log(
                  "¡Sin registros!"
                );
                httpResponse(res, error = {"code" : 404, "detailsError" : ""})
                
              }else {
      
                var usuariosConsultados = resultadoInicio;
      
                res.status(200).json(mensajes.accionExitosa,usuariosConsultados);
                
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


const registrarDireccion = (req, res) => {
    
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
  
        if (respuesta.statusCode == 200) {
          const { idUsuario } = req.params
          const { producto } = req.body
          
          var query = ""    
          
          mysqlConnection.query(
            query,
            (error, resultadoInicio) => {
              if (error) {
                httpResponse(res, error = {"code" : 500, "detailsError" : error})
                
              }else if (resultadoInicio.length == 0) {
                console.log(
                  "¡Sin registros!"
                );
                httpResponse(res, error = {"code" : 404, "detailsError" : ""})
                
              }else {
      
                var usuariosConsultados = resultadoInicio;
      
                res.status(200).json(mensajes.accionExitosa,usuariosConsultados);
                
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
 
const modificarDireccion = (req, res) => {  
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
  
        if (respuesta.statusCode == 200) {
          const { idDireccion, idCliente } = req.params
          const { direccion } = req.body
          
          var query = ""    
          
          mysqlConnection.query(
            query,
            (error, resultadoInicio) => {
              if (error) {
                httpResponse(res, error = {"code" : 500, "detailsError" : error})
                
              }else if (resultadoInicio.length == 0) {
                console.log(
                  "¡Sin registros!"
                );
                httpResponse(res, error = {"code" : 404, "detailsError" : ""})
                
              }else {
      
                var usuariosConsultados = resultadoInicio;
      
                res.status(200).json(mensajes.accionExitosa,usuariosConsultados);
                
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

module.exports = {consultarDireccion, consultarDirecciones, registrarDireccion, modificarDireccion}