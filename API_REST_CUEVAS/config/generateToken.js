const jwt = require("jsonwebtoken");

var LlaveToken = {
  key: "claveSecreta_elCamello",
};

exports.CrearToken = function (payload) {
  var llave = LlaveToken.key;
  const token = jwt.sign(payload, llave, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
};

exports.ValidarToken = function (token) {
  var statusCode = 0;
  var llave = LlaveToken.key;
  try {
    const tokenData = jwt.verify(token, llave);

    if (
      tokenData["tipo"] == "Empleado" ||
      tokenData["tipo"] == "Cliente" ||
      tokenData["tipo"] == "Repartidor" ||
      tokenData["tipo"] == "Administrador"
    ) {
      statusCode = 200;
      return { statusCode: statusCode, tokenData: tokenData };
    } else {
      statusCode = 401;
      return { statusCode: statusCode, tokenData: tokenData };
    }
  } catch (error) {
    statusCode = 401;
    return { statusCode: statusCode, tokenData: null };
  }
};


exports.ValidarTokenTipoUsuario = function (token, tipoUsuario) {
  var llave = LlaveToken.key;
  var statusCode = 0;
  try {
    const tokenData = jwt.verify(token, llave);

    if (tokenData["tipo"] == tipoUsuario) {
      statusCode = 200;
      return { statusCode: statusCode, tokenData: tokenData };
    } else {
      statusCode = 401;
      return { statusCode: statusCode, tokenData: tokenData };
    }
  } catch (error) {
    statusCode = 401;
    return { statusCode: statusCode, tokenData: null };
  }
};
