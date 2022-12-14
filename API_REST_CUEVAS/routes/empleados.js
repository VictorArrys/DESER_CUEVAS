const express = require('express')
const { registrarEmpleado, modificarEmpleado, getEmpleados, getEmpleado } = require('../controllers/empleados')
const { validarActualizarEmpleado, validarRegistrarEmpleado } = require('../utils/validators/validacion_cliente')
const router = express.Router()

// ? POST request
//! RUTA ->http://localhost:3001/api/abarrotes_cuevas/1.0/empleados
router.post('/',  validarRegistrarEmpleado, registrarEmpleado)

// ? GET request
//! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/empleados/:idUsuario
router.get('/:idUsuario', getEmpleado)

// ? PATCH request
//! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/empleados/:idUsuario
router.patch('/:idUsuario', validarActualizarEmpleado, modificarEmpleado)

//? get request
//! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/empleados
router.get('/', getEmpleados)

module.exports = router;