const mensajes = require("../utils/mensajes");

const httpError = (res, err) => {

    var mensaje

    switch (err) {
        case 500: 
        

        /*
       
        500
        400
        401
        403
        404
        201
        200
        422
        */

    }   
    console.log('--------------------------------------------------------------------------------------')
    console.log('Se ha presentado un problema en: ' + ubicacion)
    console.log('Error(es): ' + error)
    console.log('--------------------------------------------------------------------------------------')

        res.status(403)
        res.send({ Errores: err.array()})

    res.send({ error: 'Sucedio un error interno del servidor'})
    console.log({ error: 'Sucedio un error interno del servidor'})
}

module.exports = { httpError }