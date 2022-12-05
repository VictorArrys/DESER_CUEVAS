require("dotenv").config()
const express = require('express');
const req = require('express/lib/request');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const configuracionDB = require("./config/database")
const sql = require('mssql')

async function getConductor(){
    try{
        let pool = await sql.connect(configuracionDB);
        let salida = await pool.request().query('Select * from Conductor')
         console.log(salida.recordsets);
    }catch (err){
        console.log("Se genero un error debido a: " + err.message);
    }

}

getConductor();

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