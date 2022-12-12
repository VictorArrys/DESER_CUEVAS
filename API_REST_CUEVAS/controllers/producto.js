const {httpResponse} = require('../utils/handleError')
const mensajes = require("../utils/mensajes");
var mysqlConnection = require("../config/conexion");
const GestionToken = require("../config/generateToken");


const consultarProductos = (req, res) => {
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador");
  
        if (respuesta.statusCode == 200) {
          
          var query = "SELECT * FROM producto"    
          
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
      
                var productos = {mensaje: mensajes.accionExitosa, resultado: resultadoInicio
                };
      
                res.status(200).json(productos);
                
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

const consultarCatalogoProductos = (req, res) => {
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
  
        if (respuesta.statusCode == 200) {
          const { idSucursal } = req.params
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

// ? Registrar producto en general
const registrarProducto = (req, res) => {
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Administrador");
  
        if (respuesta.statusCode == 200) {
            const producto  = req.body;
            var imagen = req.file
            console.log(imagen)
            console.log("Body")
            console.log(producto)
          
            var query = "INSERT INTO producto" +
            "(codigoBarras, descripcion, ciudad, estatus, precioVenta, precioCompra,idCatagoria, nombre)" +
            " VALUES (?,?,?,?,?,?,?,?);"    
          
          mysqlConnection.query(
            query,[producto.codigoBarras, producto.descripcion, producto.ciudad, producto.estatus, 
              producto.precioVenta, producto.precioCompra, producto.idCatagoria, producto.nombre],
            (error, resultadoRegistro) => {
              if (error) {
                httpResponse(res, error = {"code" : 500, "detailsError" : error})
              
              }else {

                var query2 = "INSERT INTO fotografia(archivo,null,tipo,codigoBarras) VALUES(?,?,?)"
                mysqlConnection.query(
                  query2,[imagen, 2 ,producto.codigoBarras],
                  (error, resultadoRegistro) => {
                    if (error) {
                      httpResponse(res, error = {"code" : 500, "detailsError" : error})
                    
                    }else { 
                      console.log(resultadoRegistro)
                            var productoCreado;
                            productoCreado ={
                              mensaje: mensajes.accionExitosa, 
                              'insertado': resultadoRegistro['affectedRows']
                              }
                            
                            res.status(201).json(productoCreado);
                     
                    }
                  }
                );
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
 

// ? Registrar producto en inventario de una sucursal
const agregarProductoInventario = (req, res) => {
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
  
        if (respuesta.statusCode == 200) {
            const { idSucursal, idProducto } = req.body;
          
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
 

const modificarProducto = (req, res) => {

    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
  
        if (respuesta.statusCode == 200) {
            const { idProducto } = req.params;
            const { producto } = req.body;
          
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

module.exports = {consultarProductos, consultarCatalogoProductos, registrarProducto, agregarProductoInventario, modificarProducto}