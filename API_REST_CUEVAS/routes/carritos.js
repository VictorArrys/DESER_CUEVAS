const express = require('express')
const router = express.Router()
const { validacionIdUsuario, validacionIdUsuarioInventario } = require('../utils/validators/validacion_carritos')

const {agregarProductoCarrito, modificarProductoCarrito,
     crearPedido, consultarProductos} = require('../controllers/carritos')

// ? GET request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/:idUsuario
router.get('/:idUsuario', validacionIdUsuario, consultarProductos)

// ? POST request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/:idUsuario/:idInventario
router.post('/:idUsuario/:idInventario',validacionIdUsuarioInventario, agregarProductoCarrito)

// ? PATCH   request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/:idUsuario/:idInventario
router.patch('/:idUsuario/:idInventario',validacionIdUsuarioInventario, modificarProductoCarrito)

// ? POST request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/:idUsuario
router.post('/:idUsuario',validacionIdUsuario ,crearPedido)

module.exports = router;