const express = require('express')
const router = express.Router()
const { validarInicioSesion } = require('../utils/validators/validacion_usuario')

const {consultarSucursales} = require('../controllers/sucursales')

// ? GET request
// ! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/sucursales
router.get('/', consultarSucursales)

module.exports = router;