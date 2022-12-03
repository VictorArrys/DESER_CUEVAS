
const {httpError} = require('../utils/handleError')

const iniciarSesion =  (req, res) => {
    // listo en api
    const { correo, clave } = req.params;

    var query =
      "SELECT * FROM -- WHERE correo = ? AND pass = ?";

    mysqlConnection.query(
      query,
      [correo, clave],
      (error, resultadoInicio) => {
        if (error) {
          callback(500, mensajes.errorInterno);
        }else if (resultadoInicio.length == 0) {
          console.log(
            "¡Credenciales incorrectas! Probablemente el usuario no exista o estan mal sus credenciales"
          );
          callback(404, mensajes.peticionNoEncontrada);
        }else if (resultadoInicio[0]['tipo_usuario'] == 'Empleador' && resultadoInicio[0]['estatus'] == 3){
          callback(403, mensajes.prohibido)
        } else {
          console.log("¡Inicio de sesión exitosa!");
          var usuario = resultadoInicio[0];
          var arrayFotografia = null;
          if (usuario.fotografia == null) {
            console.log("Fotografia vacia, se procede a poner null");
          } else {
            arrayFotografia = Uint8ClampedArray.from(
              Buffer.from(usuario.fotografia.buffer, "base64")
            );
          }

          var usuarioConectado = new Usuario();
          usuarioConectado.clave = usuario["clave"];
          usuarioConectado.estatus = usuario["estatus"];
          usuarioConectado.idPerfilUsuario = usuario["id_perfil_usuario"];
          usuarioConectado.correoElectronico = usuario["correo_electronico"];
          usuarioConectado.fotografia = arrayFotografia;
          usuarioConectado.nombre = usuario["nombre_usuario"];
          usuarioConectado.tipoUsuario = usuario["tipo_usuario"];

          callback(200, usuarioConectado);
        }
      }
    );
    

    /*
    
    AccesoSistema.iniciarSesion(
      nombreUsuario,
      clave,
      (codigoRespuesta, cuerpoRespuesta) => {
        if (codigoRespuesta == 200) {
          const payloadToken = {
            idUsuario: cuerpoRespuesta.idPerfilUsuario,
            clave: cuerpoRespuesta.clave,
            tipo: cuerpoRespuesta.tipoUsuario,
            estatus: cuerpoRespuesta.estatus
          };
          var token = GestionToken.CrearToken(payloadToken);
          res.setHeader("x-access-token", token);
        }
        res.status(codigoRespuesta).json(cuerpoRespuesta);
      }
    );
    
    */
}
const consultarUsuarios = (req, res) => {
    try{
        res.send({list: [1, 2, 3, 4, 5, 6, 7]})
    }catch(exception){
        httpError(res, exception)
    }

}
    
// modificarPerfil 
const modificarUsuario = (req, res) => {
    try{

    }catch(exception){
        httpError(res, exception)
    }

}

module.exports = {consultarUsuarios, modificarUsuario}