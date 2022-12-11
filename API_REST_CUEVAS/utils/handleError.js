const mensajes = require("../utils/mensajes");

const httpResponse = (res, err) => {

    var mensaje, code
    var detallesError = err["detailsError"]

    code = err["code"]

    switch (err["code"]) {
        case 500: 
            mensaje = { mensaje: mensajes.errorInterno,
                        error: detallesError
                    };
            break; 
       
        case 400:
            mensaje = mensajes.peticionIncorrecta;
            break; 

        case 401:
            mensaje = mensajes.tokenInvalido;
            break; 

        case 403:
            mensaje = mensajes.prohibido;
            break; 

        case 404:
            mensaje = mensajes.peticionNoEncontrada;
            break; 

        case 422:
            mensaje = mensajes.instruccionNoProcesada;
            break; 

    }   
    
    console.log('--------------------------------------------------------------------------------------')
    console.log('Se ha presentado un problema')
    console.log('Error: ' + mensaje["type error"])
    console.log('Detalles: ' + err["detailsError"])
    console.log('--------------------------------------------------------------------------------------')

    
    res.status(code)
    res.send({ 
        status: code,
        mensaje
        }
        )

    
}

module.exports = { httpResponse }