require("dotenv").config()
const express = require('express');
const req = require('express/lib/request');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
//routes
app.use('/api/abarrotes_cuevas/1.0', require('./routes'))
/*
 Todo: Ejecucion del servidor
*/
app.listen(port, () => {
    console.log(`Tu app esta lista en: ${port}`)
})