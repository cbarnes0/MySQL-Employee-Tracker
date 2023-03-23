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
                "Update an Employee Role",
                "Quit"
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
            default:
                db.end();
                process.exit();
            break;
        }
    }).catch(function(err) {
        if(err) {
            throw err;
        }
    });
};

function viewAllDepartments() {
    db.query("SELECT * FROM department;", function(error, data) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.table(data);
        init();
    });
};

function viewAllRoles() {
    db.query("SELECT * FROM role", function(error, data) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.table(data);
        init();
    });
;}

function viewAllEmployees() {
    db.query("SELECT * FROM employee", function(error, data) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.table(data);
        init();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        db.query("INSERT INTO department SET ? ",
        {
            department_name: res.name
        },
        function(error) {
            if (error) throw error
            console.table(res);
            init();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Role would you like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is this role's salary?"
        },
    ]).then(function(res) {
        db.query("INSERT INTO role SET ?",
        {
            title: res.name,
            salary: res.salary,
        },
        function(error) {
            if (error) throw error
            console.table(res);
            init();
        });
    });
};

function addEmployee() {
    inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the employee's role ID?"
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the employee's manager ID?"
      },
    ]).then(function(res) {
      db.query("INSERT INTO employee SET ?",
      {
        first_name: res.first_name,
        last_name: res.last_name,
        role_id: res.role_id,
        manager_id: res.manager_id
      },
      function(error) {
        if (error) throw error;
        console.table(res);
        init();
      });
    });
  }
    

init();
