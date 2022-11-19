

const httpError = (res, err) => {
    res.status(500)
    res.send({ error: 'Sucedio un error interno del servidor'})
    console.log({ error: 'Sucedio un error interno del servidor'})
}

module.exports = {httpError}