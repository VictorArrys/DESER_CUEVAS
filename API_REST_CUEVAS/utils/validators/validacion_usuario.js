const { check } = require('express-validator')
const { validateResults } = require('../handleValidator')

const validarInicioSesion = [
    check('correo')
    .exists()
    .notEmpty()
    .isEmail(),
    check('clave')
    .exists()
    .notEmpty()
    .isLength({min:8, max:14}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];



module.exports = { validarInicioSesion }