// const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = require('./db/connection');

// console.log("Database: ", db);

function init() {

    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the employee?"
        },
        {
            type: "input",
            name: "name",
            message: "What is the name of the department?"
        },
    ]).then(function(answers) {
        console.log(answers);
        // Basic Query to SHOW DATA
    /*    db.query("SELECT * FROM department;", function(error, data) {
            if(error) {
                console.log(error);
                throw error;
            }

          //  console.log("Data: ", data);
            console.table(data);
        });
        */
        
        // in reference to PREPARED STATEMENTS
        db.query("INSERT INTO department SET ?;", answers.name, function(error, data) {
            if(error) {
                console.log(error);
                throw error;
            }

          //  console.log("Data: ", data);
            console.table(data);
        });


    }).catch(function(error) {
        if(error) {
            throw error;
        }
    });

    // console.log("I am code after the ASYNC function");

}

init();
