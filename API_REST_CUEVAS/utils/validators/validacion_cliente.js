const { check } = require('express-validator')
const { validateResults } = require('../handleValidator')

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
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validarActualizarCliente = [
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
    .exists(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


const validarRegistrarEmpleado = [ // agregar al procedimiento almacenado si existe el registro
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
    check('fechaIngreso')
    .exists()
    .notEmpty(),
    check('idCargo')
    .exists()
    .notEmpty(),
    check('idSucursal')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validarActualizarEmpleado = [
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
    .notEmpty()
    .exists(),
    check('fechaIngreso')
    .exists()
    .notEmpty(),
    check('idCargo')
    .exists()
    .notEmpty(),
    check('idSucursal')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


module.exports = { validarRegistrarCliente, validarActualizarCliente, validarRegistrarEmpleado, validarActualizarEmpleado }