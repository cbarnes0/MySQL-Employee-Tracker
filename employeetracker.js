const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = require('./db/connection');

// Init/inquirer prompt
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
// displays all departments
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
// displays all roles
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
// displays all employees
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
// adds a department
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
// adds a role and lets you choose what department is a part of
function addRole() {
    db.query("SELECT * FROM department", function(err, results) {
      if (err) throw err;
  
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
        {
          name: "department_id",
          type: "list",
          message: "Which department is this role a part of?",
          choices: results.map(department => ({ 
            name: department.name,
            value: department.id
          }))
        }
      ]).then(function(res) {
        db.query("INSERT INTO role SET ?",
          {
            title: res.name,
            salary: res.salary,
            department_id: res.department_id
          },
          function(error) {
            if (error) throw error
            console.table(res);
            init();
          });
      });
    });
  }
// adds employee and allows you to select their roleId and managerId
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
  };
// allows you to update employee role
  function updateEmployeeRole() {
    db.query("SELECT * FROM employee", function(err, results) {
      if (err) throw err;
  
      inquirer.prompt([
        {
          name: "employeeId",
          type: "list",
          message: "Which employee would you like to update?",
          choices: results.map(employee => ({ 
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        },
        {
          name: "roleId",
          type: "input",
          message: "What is the employee's new role ID?"
        }
      ]).then(function(res) {
        db.query("UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: res.roleId
            },
            {
              id: res.employeeId
            }
          ],
          function(error) {
            if (error) throw error;
            console.log("Employee role updated successfully!");
            init();
          }
        );
      });
    });
  }
    

init();
