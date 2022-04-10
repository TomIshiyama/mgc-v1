const mysql = require("mysql");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mgc",
    multipleStatements: true,
});
module.exports = pool;
