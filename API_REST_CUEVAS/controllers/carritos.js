const {httpError} = require('../utils/handleError')


const agregarProductoCarrito = (req, res) => {
    try{
        res.send({mensaje: ['si jalo']})
    }catch(exception){
        httpError(res, exception)
    }

}
    
const crearPedido = (req, res) => {
    try{

    }catch(exception){
        httpError(res, exception)
    }

}

module.exports = {agregarProductoCarrito, crearPedido}