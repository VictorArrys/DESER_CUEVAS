const config = require('./config')

const rest = new (require('rest-mssql-nodejs'))({
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database,
    port: config.port


})