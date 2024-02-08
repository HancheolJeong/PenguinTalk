const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnection: true,
  connectionLimit : 10,
  queueLimit : 0
});

module.exports = connection;

// exports.pool = (queryString, params) => {
//   return new Promise((resolve, reject) =>{
//       this.connection.query(queryString, params, (err, rows, fields)=> {
//           (err) ? reject(err) : resolve(rows);
//       })
//   })
// }