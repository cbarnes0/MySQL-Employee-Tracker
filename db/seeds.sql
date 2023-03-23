USE employee_db;

INSERT INTO department (department_name)
VALUES ("Management");
INSERT INTO department (department_name)
VALUES ("Register");
INSERT INTO department (department_name)
VALUES ("Kitchen");
INSERT INTO department (department_name)
VALUES ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Owner", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Host", 25000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Cook", 18000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Free Advertisement", null, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Eugene", "Krabs", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Squidward", "Tentacles", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Spongebob", "Squarepants", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sheldon", "Plankton", 4, 4);