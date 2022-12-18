const express = require('express')
const router = express.Router()
const {
    consultarProductos,
    consultarCatalogoProductos,
    registrarProducto,
    agregarProductoInventario,
    modificarProducto
} = require('../controllers/producto')
const {
    validarRegistrarProducto,
    validarAgregarProducto,
    validarModificarProducto,
    validarConsultaCatalogo
} = require('../utils/validators/validacion_producto')

const multer = require('multer');
const multerUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 * 15 } })

// ? POST request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos
router.post('/', multerUpload.single('imagen'), validarRegistrarProducto, registrarProducto)

// ? POST request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/:idSucursal/:idProducto
router.post('/:idSucursal/:idProducto', validarAgregarProducto, agregarProductoInventario)

// ? GET request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos
router.get('/', consultarProductos)

// ? GET request Consultar productos de lado del cliente
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/sucursal/:idSucursal
router.get('/sucursal/:idSucursal', validarConsultaCatalogo, consultarCatalogoProductos)

// ? PATCH request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/:idProducto
router.patch('/:idProducto', multerUpload.single('imagen'), validarModificarProducto, modificarProducto)

module.exports = router;