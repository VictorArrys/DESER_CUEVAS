const { check } = require('express-validator')
const {validateResults} = require('../handleValidator')

const validarRegistrarCliente = [ // agregar al procedimiento almacenado si existe el registro
    check('nombre')
    .exists()
    .notEmpty(),
    check('primerApellido')
    .exists()
    .notEmpty(),
    check('segundoApellido')
    .exists()
    .notEmpty(),
    check('correo')
    .exists()
    .notEmpty()
    .isEmail(),
    check('clave')
    .notEmpty(),
    check('tipo')
    .notEmpty(),
    check('noCelular')
    .notEmpty(),
    check('fechaNacimiento')
    .notEmpty()
    .isLength({min:5, max:10}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];



module.exports = { validarRegistrarCliente }