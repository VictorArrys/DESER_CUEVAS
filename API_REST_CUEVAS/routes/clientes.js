const express = require('express')
const router = express.Router()
const {getCliente, registrarCliente, modificarCliente, getClientes} = require('../controllers/clientes')
const { validarRegistrarCliente, validarActualizarCliente } = require('../utils/validators/validacion_cliente')
/*
 Todo: La agrupacion de cada peticion se acomodara de la siguiente forma:
    (ruta, validacion de parametros, metodo del controlador)
*/

// ? POST request
//! RUTA ->http://localhost:3001/api/abarrotes_cuevas/1.0/clientes
router.post('/', validarRegistrarCliente, registrarCliente)

// ? GET request
//! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/clientes/:idUsuario
router.get('/:idUsuario', getCliente)

// ? PATCH request
//! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/clientes/:idUsuario
router.patch('/:idUsuario', validarActualizarCliente, modificarCliente)

//? get request
//! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/clientes
router.get('/', getClientes)

module.exports = router;