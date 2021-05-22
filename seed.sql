DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
id INTEGER(20) AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

-- upate data values inside table column
-- UPDATE department SET name = "Andy" WHERE id = 2;
-- DELETE FROM department WHERE id = 2;

-- insert data into table columns
INSERT INTO department (name) VALUE ("SLT");
SELECT * FROM department;

CREATE TABLE role (
id INTEGER(20) AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id) VALUE ("CEO", 20, 1);
SELECT * FROM role;

SET SQL_SAFE_UPDATES = 0;
-- UPDATE `role` SET `title` = "Pres" WHERE `department_id` = 1;
		

CREATE TABLE employee (
id INTEGER(20) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUE ("Stephan", "du Plooy", "1", "1");
SELECT * FROM employee;

-- SELECT id, first_name, last_name, title, salary, role_id manager_id 
-- FROM role
-- INNER JOIN employee ON department_id = employee.id

-- SELECT name, department_id, title, salary, first_name, last_name, role_id, manager_id
-- FROM department
-- INNER JOIN role ON department.id = department_id
-- INNER JOIN employee ON department_id = manager_id;

