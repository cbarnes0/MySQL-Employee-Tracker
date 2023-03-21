const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'employee_db',
});