const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host : '192.168.64.2',
    user : 'jamiewhite',
    password : 'password',
    database : 'SchoolPOSSystem',
    multipleStatements : true
});

dbConn.connect(function(err){
    if (err) throw err;
    console.log("Database connected.");
});

module.exports = dbConn;