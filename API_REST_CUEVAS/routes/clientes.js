const express = require('express')
const router = express.Router()
const {getCliente, registrarCliente, modificarCliente} = require('../controllers/clientes')

router.post('/usuarios/clientes/', registrarCliente)

router.get('/usuarios/clientes/:celular', getCliente)

router.patch('/usuarios/clientes/:celular', modificarCliente)

module.exports = router;