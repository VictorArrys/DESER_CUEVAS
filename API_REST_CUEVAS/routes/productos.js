const express = require('express')
const router = express.Router()
const {consultarProductos, consultarCatalogoProductos, registrarProducto, agregarProductoInventario, modificarProducto} = require('../controllers/producto')
const multer = require('multer');
const upload = multer({ dest : 'uploads/'})

// ? POST request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos
router.post('/',upload.single('imagen'), registrarProducto)

// ? POST request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/:idSucursal/:idProducto
router.post('/:idSucursal/:idProducto', agregarProductoInventario)

// ? GET request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos
router.get('/', consultarProductos)

// ? GET request Consultar productos de lado del cliente
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/:idSucursal
router.get('/sucursal/:idSucursal/', consultarCatalogoProductos)

// ? PATCH request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/productos/:idProducto
router.patch('/:idProducto', modificarProducto)

module.exports = router;