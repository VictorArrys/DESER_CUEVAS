const express = require('express')
const router = express.Router()
const { validarInicioSesion } = require('../utils/validators/validacion_usuario')

const {consultarUsuarios, modificarUsuario, iniciarSesion} = require('../controllers/usuarios')

// ? GET request
// ! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/usuarios/iniciarSesion/:correo/:clave
router.get("/iniciarSesion/:correo/:clave", validarInicioSesion, iniciarSesion)

// ? GET request
// ! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/usuarios
router.get('/', consultarUsuarios)

// ? PATCH request
// ! RUTA -> http://localhost:3001/api/abarrotes_cuevas/1.0/usuarios/:idUsuario
router.patch('/:idUsuario', modificarUsuario)

module.exports = router;