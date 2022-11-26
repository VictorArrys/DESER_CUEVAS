
const {httpError} = require('../utils/handleError')

const consultarUsuarios = (req, res) => {
    try{
        res.send({list: [1, 2, 3, 4, 5, 6, 7]})
    }catch(exception){
        httpError(res, exception)
    }

}

const registrarUsuario = (req, res) => {
    try{

    }catch(exception){
        httpError(res, exception)
    }

}
    
// modificarPerfil 
const modificarUsuario = (req, res) => {
    try{

    }catch(exception){
        httpError(res, exception)
    }

}

module.exports = {consultarUsuarios, registrarUsuario, modificarUsuario}