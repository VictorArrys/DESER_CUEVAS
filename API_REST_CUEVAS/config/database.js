const sql = require ('mssql')

/*const rest = new (require('rest-mssql-nodejs'))({
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database,
    port: config.port

});*/

const configuracionDB = {
    user: "sa",
    password: "usagitsukino",
    server: "localhost",
    database: "SistemaReportesVehiculos",
    port: 1433,
    options: {
        encrypt: false, 
        trustServerCertificate: true,
        enableArithAbrot: true,
        trustedconnection: false,
        instancename: 'LOCALHOST'
    },
}


module.exports = configuracionDB;