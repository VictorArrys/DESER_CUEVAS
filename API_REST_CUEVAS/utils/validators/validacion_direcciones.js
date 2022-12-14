const { check } = require('express-validator')
const {validateResults} = require('../handleValidator')

const validarRegistrarDireccion = [
    check('idCliente')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('calle')
    .exists()
    .notEmpty(),
    check('noExterior')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('noInterior')
    .exists()    
    .isNumeric(),
    check('colonia')
    .exists()
    .notEmpty(),
    check('codigoPostal')
    .exists()    
    .isNumeric()
    .isLength({min:5, max:5}),
    check('municipio')
    .exists()
    .notEmpty(),
    check('entidadFederativa')
    .exists()
    .notEmpty(),
    check('latitud')
    .exists()
    .notEmpty(),
    check('longitud')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validarModificarDireccion = [ 
    check('idDireccion')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('calle')
    .exists()
    .notEmpty(),
    check('noExterior')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('noInterior')
    .exists()    
    .isNumeric(),
    check('colonia')
    .exists()
    .notEmpty(),
    check('codigoPostal')
    .exists()    
    .isNumeric()
    .isLength({min:5, max:5}),
    check('municipio')
    .exists()
    .notEmpty(),
    check('entidadFederativa')
    .exists()
    .notEmpty(),
    check('latitud')
    .exists()
    .notEmpty(),
    check('longitud')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validarRegistrarDireccion , validarModificarDireccion}