const express = require('express')
const router = express.Router()
const {consultarProductos, consultarCatalogoProductos, registrarProducto, modificarProducto} = require('../controllers/producto')


router.post('/productos/', registrarProducto)

router.get('/productos/', consultarProductos)

//Consultar producto de lado del cliente
router.get('/sucursal/:idSucursal/:idProduct', consultarCatalogoProductos)

router.patch('/productos/:idProduct', modificarProducto)

module.exports = router;