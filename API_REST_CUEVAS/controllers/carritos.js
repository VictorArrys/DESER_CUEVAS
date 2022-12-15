const {httpResponse} = require('../utils/handleError')
const mensajes = require("../utils/mensajes");
var mysqlConnection = require("../config/conexion");
const GestionToken = require("../config/generateToken");

const consultarProductos = (req, res) => {
    
  try{
      const token = req.headers["x-access-token"];
      var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");

      if (respuesta.statusCode == 200) {
        const { idUsuario } = req.params
        
        var query = "SELECT * FROM productoscarrito WHERE idUsuario = ?;"    
        
        mysqlConnection.query(
          query,[idUsuario],
          (error, resultadoInicio) => {
            if (error) {
              httpResponse(res, error = {"code" : 500, "detailsError" : error})
              
            }else if (resultadoInicio.length == 0) {
              console.log(
                "¡Sin registros!"
              );
              //Si no hay registros podemos usar un 200 porque podría parecer que esta mal
              httpResponse(res, error = {"code" : 404, "detailsError" : ""})
              
            }else {
    
              var productosCarrito =  {
                mensaje: mensajes.accionExitosa,
                productos : resultadoInicio
              };
    
              res.status(200).json(productosCarrito);
              
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

const agregarProductoCarrito = (req, res) => {    
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
  
        if (respuesta.statusCode == 200) {
          const { idUsuario, idInventario } = req.params
          const producto  = req.body
          
          var query = "INSERT INTO productodecarrito(idusuario,idInventario,precio,cantidadProducto)"+
          "VALUES(?,?,?,?);"    
          
          mysqlConnection.query(
            query,[idUsuario, idInventario, producto.precio,producto.cantidad],
            (error, resultadoInicio) => {
              if (error) {
                httpResponse(res, error = {"code" : 500, "detailsError" : error})
                
              }else if (resultadoInicio.length == 0) {
                console.log(
                  "¡Sin registros!"
                );
                httpResponse(res, error = {"code" : 404, "detailsError" : ""})
                
              }else {
      
                var productoCarrito =  {
                  mensaje: mensajes.accionExitosa,
                  'insertado': resultadoInicio['affectedRows']
                };
      
                res.status(201).json(productoCarrito);
                
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

const modificarProductoCarrito = (req, res) => {    
  try{
      const token = req.headers["x-access-token"];
      var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");

      if (respuesta.statusCode == 200) {
        const { idUsuario, idInventario } = req.params
        const producto  = req.body
        
        var query = "UPDATE productodecarrito SET precio = ?, "+
        "cantidadProducto = ? WHERE idusuario = ? AND idInventario = ?"
        
        mysqlConnection.query(
          query,[producto.precio,producto.cantidad, idUsuario, idInventario],
          (error, resultadoInicio) => {
            if (error) {
              httpResponse(res, error = {"code" : 500, "detailsError" : error})
              
            }else if (resultadoInicio.length == 0) {
              console.log(
                "¡Sin registros!"
              );
              httpResponse(res, error = {"code" : 404, "detailsError" : ""})
              
            }else {
        
              res.status(204).json();
              
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
    
const crearPedido = (req, res) => {
    
    try{
        const token = req.headers["x-access-token"];
        var respuesta = GestionToken.ValidarTokenTipoUsuario(token, "Cliente");
  
        if (respuesta.statusCode == 200) {
          const { idUsuario } = req.params
          const productosPedido = req.body

          var queryPedido = "INSERT INTO pedido(metodoPago, estatus, fechaHora, idUsuario, " + 
          "idDireccion,costoPedido) VALUES (?,?,?,?,?,?);"
          var query = "CALL crearPedido(?,?,?,?)"           
        
          mysqlConnection.query(
            queryPedido,[productosPedido.metodoPagoP, productosPedido.estatusP, productosPedido.fechaHoraP,
              idUsuario, productosPedido.idDireccionP ,productosPedido.costoPedidoP],
             (error, resultadoInicio) => {
               if (error) {
                 httpResponse(res, error = {"code" : 500, "detailsError" : error})
                 
               }else if (resultadoInicio.length == 0) {
                 console.log(
                   "¡Sin registros!"
                 );
                 httpResponse(res, error = {"code" : 404, "detailsError" : ""})
                 
               } else{
                  var folio = resultadoInicio['insertId']
                  var productos = productosPedido.productos

                  for(var i = 0; i < productos.length; i++){

                    const productoDePedido = productos[i];
                    mysqlConnection.query(
                      query,[folio,productoDePedido.codigoBarrasP, productoDePedido.idInventarioP, productoDePedido.cantidadPedidoP],
                      (error, resultadoInicio) => {
                        if (error) {
                          httpResponse(res, error = {"code" : 500, "detailsError" : error})
                          
                        }else if (resultadoInicio.length == 0) {
                          console.log(
                            "¡Sin registros!"
                          );
                          httpResponse(res, error = {"code" : 404, "detailsError" : ""})
                          
                        }
                      }
                    );
                  }
                  var pedidoCreado =  {
                    mensaje: mensajes.accionExitosa,
                    'insertado': resultadoInicio['affectedRows']
                  };            
                  res.status(201).json(pedidoCreado);
                
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

module.exports = {agregarProductoCarrito, crearPedido, modificarProductoCarrito, consultarProductos}