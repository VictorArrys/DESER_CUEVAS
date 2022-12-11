const { validationResult } = require("express-validator")

const validateResults = (req, res, next) => {

    try{
        validationResult(req).throw()
        return next()

    }catch(err){
        res.status(403)
        console.log('--------------------------------------------------------------------------------------')
        console.log('Se ha presentado un problema')
        console.log('Error(es): ' + err.array())
        console.log('--------------------------------------------------------------------------------------')

        res.send({ Errores: err.array()})
    }
}

module.exports = { validateResults }