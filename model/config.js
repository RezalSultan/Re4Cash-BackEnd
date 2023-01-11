require("dotenv").config();
const mysql = require("mysql2/promise");

const db = mysql.createPool({
   host: `${process.env.HOST}`,
   user: "root",
   database: `${process.env.DATABASE}`,
   password: "M33j33c4nt3k"
})

module.exports = {db};