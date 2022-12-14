const { check } = require('express-validator')
const {validateResults} = require('../handleValidator')

const validarRegistrarProducto = [ // agregar al procedimiento almacenado si existe el registro
    
    check('codigoBarras')
    .exists()
    .notEmpty()
    .isLength({min:16, max:16}),
    check('descripcion')
    .exists()
    .notEmpty(),
    check('ciudad')
    .exists()
    .notEmpty(),
    check('estatus')
    .exists()
    .notEmpty(),
    check('precioVenta')
    .exists()
    .notEmpty(),
    check('precioCompra')
    .exists()
    .notEmpty(),
    check('idCatagoria')
    .exists()
    .notEmpty(),
    check('nombre')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


const validarModificarProducto = [ // agregar al procedimiento almacenado si existe el registro
    
    check('idProducto')
    .exists()
    .notEmpty()
    .isLength({min:16, max:16}),
    check('descripcion')
    .exists()
    .notEmpty(),
    check('ciudad')
    .exists()
    .notEmpty(),
    check('estatus')
    .exists()
    .notEmpty(),
    check('precioVenta')
    .exists()
    .notEmpty(),
    check('precioCompra')
    .exists()
    .notEmpty(),
    check('idCatagoria')
    .exists()
    .notEmpty(),
    check('nombre')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validarAgregarProducto = [ // agregar al procedimiento almacenado si existe el registro
    check('idSucursal')
    .exists()
    .notEmpty(),
    check('idProducto')
    .exists()
    .notEmpty()
    .isLength({min:16, max:16}),
    check('cantidad')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('fechaCaducidad')
    .exists()
    .notEmpty()
    .isDate(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validarConsultaCatalogo = [ // agregar al procedimiento almacenado si existe el registro
    
    check('idSucursal')
    .exists()
    .notEmpty()
    .isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validarRegistrarProducto,validarModificarProducto, validarAgregarProducto, validarConsultaCatalogo }