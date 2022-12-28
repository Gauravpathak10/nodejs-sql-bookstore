
const mysql = require( "mysql");


 const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"bookStore"
});

module.exports= db;