const mysql = require('mysql2')

const con=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"mysqlroot123@",
    database:"steven" //stevenblog is our database name.
})

module.exports=con;