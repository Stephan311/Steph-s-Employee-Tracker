// const inquirer = require('inquirer');
const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',


    password: 'Seahawks2014',
    database: 'employees_db',

});

const afterConnection = () => {
    connection.query(`SELECT name, department_id, title, salary, first_name, last_name, role_id, manager_id
    FROM department
    INNER JOIN role ON department.id = department_id
    INNER JOIN employee ON department_id = manager_id;
    `, (err, res) => {
        if (err) throw (err);
        res.forEach(({title, name, department_id, salary, first_name, last_name, role_id, manager_id}) => {
            console.log(` |${title}| |${name}| |${department_id}| |${salary}| |${first_name}| |${last_name}| |${role_id}| |${manager_id}|`)
        });
        console.log("hello");
        // connection.end();
    });
   afterConnection()  
};

//QUESTIONS for the employee

const questions = () => {
    return inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What Do You Want to Do?',
        choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add an Employee', 'Add a Department', 'Add a Role', 'Update a current role'],
        validate: (answer)=>{ if(answer){return true} else {return 'Please enter an answer before proceeding'}}
    },
]).then((answer) => {
    if (answer.choice === 'View All Employees') {
       viewEmployees()
    } else if (answer.choice === 'Update a current role') {
        upateRole()
    } else if (answer.choice === 'Add an Employee') {
        addEmployee()
    } else if (answer.choice === 'Add a Department') {
        addDepartment()
    } else if (answer.choice == 'View All Departments') {
        viewDepartments()
    } else if (answer.choice == "Add a Role") {
        addRole()
    } 
})
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "title",
            message: 'What title is this position?'
        },
        {
            type: 'input',
            name: "salary",
            message: 'What is the salary of this role?'
        },
        {
            type: 'input',
            name: "departmentid",
            message: 'What department is this role in? What is the department ID?'
        },
    ]).then((answers) => {
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.departmentid
            },
            (err) => {
                if (err) throw err;
                console.log('Succesfully Added a Department')
                questions();
            }
        )

    })


}


const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "deptname",
            message: 'What is the new department being added?'
        },
    ]).then((answers) => {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: answers.deptname
            },
            (err) => {
                if (err) throw err;
                console.log('Succesfully Added a Department')
                questions();
            }
        )

    })


}


const upateRole = () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What is the id of the employee?'
            },
            {
                type: 'input',
                name: 'title',
                message: 'What title do you want to update to?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is this employees new salary?'
            }
        ]).then((answers) => {
            console.log('Updating employees');
            const query = connection.query(
                'UPDATE role SET ?, ? WHERE id = ?',
                [
                    {
                    title: answers.title
                    },
                    {
                    salary: answers.salary
                    },
                    {
                    id: answers.id
                    },
                ],
                (err, res) => {
                    if (err) throw (err);
                    console.log(`${res.affectedRows} role updated!\n`)
                }
            );
            
            console.log(query.sql);    
            questions();  
            
        })


    }

    const addEmployee = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: "firstname",
                message: 'What is the first name?'
            },
            {
                type: 'input',
                name: "lastname",
                message: 'What is the last name?'
            }, {
                type: 'input',
                name: "roleid",
                message: 'What is the role ID of this employee?'
            },
            {
                type: 'what is the manager ID of this employee?',
                name: "managerid",
                message: 'What is the managers id?'
            },

        ]).then((answers) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answers.firstname,
                    last_name: answers.lastname,
                    role_id: answers.roleid,
                    manager_id: answers.managerid
                },
                (err) => {
                    if (err) throw err;
                    console.log('Succesfully Added an Employee')
                    questions();
                }
            )

        })

  
    }

const viewEmployees = () => {
    console.log("Viewing All Employees...\n");
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw (err);
        console.log(res);
    });
    questions();

}

const viewDepartments = () => {
    console.log("Viewing All Departments...\n");
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw (err);
        console.log(res);
    });
    questions();

}


const createoRole = () => {
    console.log("making a new role...\n")
    const query = connection.query(
        'INSERT INTO role SET ?',
        {
            title: "CEO",
            salary: 1000000000,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} role updated!!`)
        }
    )
};





connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    createoRole();
})

module.exports = questions()