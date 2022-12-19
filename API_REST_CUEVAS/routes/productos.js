const express = require('express')
const router = express.Router()
const {
    consultarProductos,
    consultarCatalogoProductos,
    registrarProducto,
    agregarProductoInventario,
    modificarProducto,
    consultarCatalogoProducto
} = require('../controllers/producto')
const {
    validarRegistrarProducto,
    validarAgregarProducto,
    validarModificarProducto,
    validarConsultaCatalogo
} = require('../utils/validators/validacion_producto')

const mimeTypes = require('mime-types');

const multer = require('multer');

var codigoBarras

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, 'img/products');
    },
    filename: function(req, file, cb) {

        cb(null, 'img-' + req.body.codigoBarras + '.' + mimeTypes.extension(file.mimetype))
    }
});
//////////////////////////////////////////////  

var upload = multer({ storage: storage });

/*
const addCodigoBarras = (req, res, next) => {
    console.log("El body")
    console.log(req.body)
    codigoBarras = req.body.codigoBarras
    return next()
}
*/

// ? POST request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos
router.post('/', upload.single('imagen'), validarRegistrarProducto, registrarProducto)

// ? POST request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/:idSucursal/:idProducto
router.post('/:idSucursal/:idProducto', validarAgregarProducto, agregarProductoInventario)

// ? GET request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos
router.get('/', consultarProductos)

// ? GET request Consultar productos de lado del cliente
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/sucursal/:idSucursal
router.get('/sucursal/:idSucursal', validarConsultaCatalogo, consultarCatalogoProductos)

// ? GET request Consultar productos de lado del cliente
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/sucursal/:idSucursal/:idProducto
router.get('/sucursal/:idSucursal/:idProducto', consultarCatalogoProducto)

// ? PATCH request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/:idProducto
router.patch('/:idProducto', upload.single('imagen'), validarModificarProducto, modificarProducto)

module.exports = router;