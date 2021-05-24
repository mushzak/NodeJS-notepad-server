const mysql = require('mysql');
const fs = require('fs');
const configData = fs.readFileSync('./database.json');
const data = JSON.parse(configData)

const connection = mysql.createConnection({
    host: data.dev.host,
    user: data.dev.user,
    password: data.dev.password,
    database: data.dev.database
});

connection.connect(function(error){
    if(!!error) {
        console.log(error);
    } else {
        console.log('Connected..!');
    }
});

module.exports = connection;
