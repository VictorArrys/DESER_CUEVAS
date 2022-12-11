//Respuestas
//500
exports.errorInterno = {
    "type error" : "Error interno del servidor."
}

// 400
exports.peticionIncorrecta = {
    "type error" : "Petición incorrecta."
}

// 401
exports.tokenInvalido = {
    "type error" : "Token invalido."
}

// 403
exports.prohibido = {
    "type error" : "Acceso prohibido a esta ruta"
}

// 404
exports.peticionNoEncontrada = {
    "type error" : "Petición no encontrada"
}


//201
exports.registroExitoso = {
    "result action" : {
    "message" : "Registro exitoso"
    }
}

//200
exports.accionExitosa = {
    "result action" : {
    "message" : "Acccion exitosa"
    }
}

//422
exports.instruccionNoProcesada = {
    "type error" : "Solicitud no procesada"
        
}
