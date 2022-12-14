const express = require('express')
const router = express.Router()
const { validarRegistrarDireccion, validarModificarDireccion } = require('../utils/validators/validacion_direcciones')

const {consultarDireccion, consultarDirecciones, registrarDireccion, modificarDireccion} = require('../controllers/direcciones')

// ! http://localhost:3001/api/abarrotes_cuevas/1.0/direcciones/:idCliente
router.post('/:idCliente',validarRegistrarDireccion, registrarDireccion)

// ! http://localhost:3001/api/abarrotes_cuevas/1.0/direcciones/:idCliente
router.get('/:idCliente', consultarDirecciones)

// ! http://localhost:3001/api/abarrotes_cuevas/1.0/direcciones/:idCliente/:idDireccion
router.get('/:idCliente/:idDireccion', consultarDireccion)

// ! http://localhost:3001/api/abarrotes_cuevas/1.0/direcciones/:idDireccion
router.patch('/:idDireccion', validarModificarDireccion, modificarDireccion)

module.exports = router;