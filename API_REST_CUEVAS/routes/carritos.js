const express = require('express')
const router = express.Router()
const {agregarProductoCarrito, crearPedido} = require('../controllers/carritos')

// http://localhost:3001/api/abarrotes_cuevas/1.0/carritos
router.post('/clientes/:idUsuario/:codigoBarras', agregarProductoCarrito)

router.post('/usuarios/clientes/:idUsuario/carrito/pedido', crearPedido)

module.exports = router;