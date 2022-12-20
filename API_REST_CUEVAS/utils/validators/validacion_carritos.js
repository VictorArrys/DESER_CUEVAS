const { check } = require('express-validator')
const { validateResults } = require('../handleValidator')

const validacionIdUsuario = [
    check('idUsuario')
    .exists()
    .notEmpty()
    .isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validacionIdUsuarioInventario = [
    check('idUsuario')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('idInventario')
    .exists()
    .notEmpty()
    .isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];



module.exports = { validacionIdUsuario, validacionIdUsuarioInventario }