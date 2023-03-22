const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'employee_db',
});

connection.connect(function (err) {
    
    if(err) {
        console.log("SOmething went wrong")
        console.log(err);
        throw err;
    } 
});

module.exports = connection;