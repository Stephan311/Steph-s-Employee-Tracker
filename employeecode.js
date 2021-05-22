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

//QUESTIONS for the employee

const questions = () => {
    return inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What Do You Want to Do?',
        choices: ['View All Employees', 'Add an Employee', 'Add a Department', 'Add a Role', 'Update a current role'],
        validate: (answer)=>{ if(answer){return true} else {return 'Please enter an answer before proceeding'}}
    },
]).then((answer) => {
    if (answer.choice === 'View All Employees') {
        afterConnection();
    } else if (answer.choice === 'Update a current role') {
        upateRole()
    }
})
};

const upateRole = () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What title do you want to update to?'
            },
        ]).then((answers) => {
            console.log('Updating employees');
            const query = connection.query(
                `UPDATE role SET title = ${answers.title} WHERE department_id = 1;`,
                (err, res) => {
                    if (err) throw (err);
                    console.log(`${res.affectedRows} role updated!\n`)
                }
            );
            
            console.log(query.sql);    
            questions();  
            
        })


    }

const afterConnection = () => {
    connection.query(`SELECT id, first_name, last_name, title, salary, role_id manager_id 
    FROM role
    INNER JOIN employee ON department_id = employee.id
    `, (err, res) => {
        if (err) throw (err);
        res.forEach(({id, first_name, last_name, role_id, manager_id, title, salary}) => {
            console.log(`ID: ${id} | First Name: ${first_name} | Last Name: ${last_name} | Role ID: ${role_id} | Manager ID: ${manager_id} | Title: ${title} | Salary: ${salary}`);
        });
        console.log("hello");
        // connection.end();
    });
    questions();  
};

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