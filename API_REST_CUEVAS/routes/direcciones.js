const express = require('express')
const router = express.Router()
const {consultarDireccion, consultarDirecciones, registrarDireccion, modificarDireccion} = require('../controllers/direcciones')

// ! http://localhost:3001/api/abarrotes_cuevas/1.0/direcciones/:idCliente
router.post('/:idCliente', registrarDireccion)

// ! http://localhost:3001/api/abarrotes_cuevas/1.0/direcciones/:idCliente
router.get('/:idCliente', consultarDirecciones)

// ! http://localhost:3001/api/abarrotes_cuevas/1.0/direcciones/:idCliente/:idDireccion
router.get('/:idCliente/:idDireccion', consultarDireccion)

// ! http://localhost:3001/api/abarrotes_cuevas/1.0/direcciones/:idCliente/:idDireccion
router.patch('/:idCliente/:idDireccion', modificarDireccion)

module.exports = router;