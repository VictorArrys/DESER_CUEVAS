require("dotenv").config()
const express = require('express');
const req = require('express/lib/request');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;

app.use(express.json())
//middlewares
app.use(morgan('server'));

//routes
//app.use(require('./src/paths/paths_categorias'))
app.use('/api/abarrotes_cuevas/1.0', require('./routes'))


//starting server
app.listen(port, () => {
    console.log(`Tu app esta lista en: ${port}`)
})