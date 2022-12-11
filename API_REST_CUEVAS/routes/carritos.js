const express = require('express')
const router = express.Router()
const {agregarProductoCarrito, crearPedido} = require('../controllers/carritos')

// ? POST request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/:idUsuario/:codigoBarras
router.post('/:idUsuario/:codigoBarras', agregarProductoCarrito)

// ? POST request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/carritos/:idUsuario/pedido
router.post('/:idUsuario/pedido', crearPedido)

module.exports = router;