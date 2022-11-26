const express = require('express')
const router = express.Router()
const {consultarDireccion, registrarDireccion, modificarDireccion} = require('../controllers/direcciones')

router.post('/usuarios/clientes/direcciones', registrarDireccion)

router.get('/usuarios/clientes/direcciones/', consultarDireccion)

router.patch('/usuarios/clientes/direcciones/:idDireccion', modificarDireccion)

module.exports = router;