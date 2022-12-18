const express = require('express')
const router = express.Router()
const {
    consultarCategorias
} = require('../controllers/categorias')

// ? GET request
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/categorias
router.get('/', consultarCategorias)


module.exports = router;