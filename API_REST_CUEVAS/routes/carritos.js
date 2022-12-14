const express = require('express')
const router = express.Router()
const {agregarProductoCarrito, modificarProductoCarrito,
     crearPedido, consultarProductos} = require('../controllers/carritos')

// ? GET request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/
router.get('/:idUsuario', consultarProductos)

// ? POST request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/:idUsuario/:idInventario
router.post('/:idUsuario/:idInventario', agregarProductoCarrito)

// ? PATCH   request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/:idUsuario/:idInventario
router.patch('/:idUsuario/:idInventario', modificarProductoCarrito)

// ? POST request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/:idUsuario
router.post('/:idUsuario', crearPedido)

module.exports = router;