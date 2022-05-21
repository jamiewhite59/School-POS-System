const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host : 'sql4.freemysqlhosting.net',
    user : 'sql4493731',
    password : 'RhJb5HFr4L',
    database : 'sql4493731',
    multipleStatements : true
});

dbConn.connect(function(err){
    if (err) throw err;
    console.log("Database connected.");
});

module.exports = dbConn;