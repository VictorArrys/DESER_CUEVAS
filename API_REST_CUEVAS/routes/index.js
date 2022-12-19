const express = require('express')
const router = express.Router()
const fs = require('fs')

const pathRouter = `${__dirname}`

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExt = removeExtension(file)
    const skip = ['index'].includes(fileWithOutExt)
    if (!skip) {
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`))
        console.log('CARGAR RUTA----------->', fileWithOutExt)
    }

});

// ? GET request 
// ! http://localhost:3001/api/abarrotes_cuevas/1.0/img/productos/:nombreimagen
router.use('/img/products', express.static('img/products'));

router.get('*', (req, res) => {

    res.status(404)
    res.send({ error: 'No se encontro la ruta buscada' })
});

module.exports = router