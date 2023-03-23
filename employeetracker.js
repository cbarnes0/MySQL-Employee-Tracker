// const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = require('./db/connection');

// console.log("Database: ", db);

function init() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: 
            [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role"
            ]
        }
    ]).then(function(answer) {
        switch (answer.choice) {
            case "View All Departments":
                viewAllDepartments();
            break;

            case "View All Roles":
                viewAllRoles();
            break;

            case "View All Employees":
                viewAllEmployees();
            break;

            case "Add a Department":
                addDepartment();
            break;

            case "Add a Role":
                addRole();
            break;

            case "Add an Employee":
                addEmployee();
            break;

            case "Update an Employee Role":
                updateEmployeeRole();
            break;
        }
    }).catch(function(err) {
        if(err) {
            throw err;
        }
    });
};

    

init();
