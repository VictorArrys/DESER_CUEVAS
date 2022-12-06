const sql = require ('mssql')

/*const rest = new (require('rest-mssql-nodejs'))({
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database,
    port: config.port

});*/

const configuracionDB = {
    user: "equipo3",
    password: "UndercoverA07",
    server: "servercuevas.database.windows.net",
    database: "bdcuevas",
    //port: 1433,
    options: {
        encrypt: true, 
        trustServerCertificate: true,
        enableArithAbrot: true,
        trustedconnection: false,
        instancename: 'servercuevas'
    },
}

/*const configuracionDB = {
    user: "sa",
    password: "123456",
    server: "X2-PCX1\SQLSERVER",
    database: "bdcuevas",
    //port: 1433,
    options: {
        encrypt: true, 
        trustServerCertificate: true,
        enableArithAbrot: true,
        trustedconnection: false,
        instancename: 'LOCALHOST'
    },
}*/


module.exports = configuracionDB;