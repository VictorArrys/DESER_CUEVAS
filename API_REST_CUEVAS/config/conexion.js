const mysql = require('mysql');

const { promisify } = require('util');

const {SERVER_CREDENTTIALS, LOCAL_CREDENTTIALS } = require('./credenciales');

var pool;



pool = mysql.createPool(SERVER_CREDENTTIALS);
console.log("Configuracion de Base de datos en Server")


pool = mysql.createPool(LOCAL_CREDENTTIALS);
console.log("Configuracion de Base de datos en Localhost")



pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Se ha cerrado la conexion');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos ha presentado muchas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Se rechazo la conexion');
        }
    }
    if (connection) {
        connection.release();
        console.log('Conexion exitosa con la base de datos');
        return;
    }
});

pool.query = promisify(pool.query);

module.exports = pool;