const express = require('express')
const router = express.Router()

const {consultarUsuarios, modificarUsuario} = require('../controllers/usuarios')

//http://localhost:3001/api/abarrotes_cuevas/1.0/usuarios
router.get('/', consultarUsuarios)

router.patch('/:idUsuario', modificarUsuario)

module.exports = router;