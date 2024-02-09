require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnection: true,
  connectionLimit : 10,
  queueLimit : 0
});

exports.connection = connection;

exports.pool = (queryString, params) => {
  return new Promise((resolve, reject) =>{
      this.connection.query(queryString, params, (err, rows, fields)=> {
          (err) ? reject(err) : resolve(rows);
      })
  })
}


exports.transaction = (queries) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.beginTransaction((beginErr) => {
        if (beginErr) {
          connection.release();
          reject(beginErr);
          return;
        }

        const resultsArray = [];

        const executeQuery = (queryIndex) => {
          if (queryIndex === queries.length) {
            connection.commit((commitErr) => {
              if (commitErr) {
                connection.rollback(() => {
                  connection.release();
                  reject(commitErr);
                });
              } else {
                connection.release();
                resolve(resultsArray);
              }
            });
          } else {
            const { queryString, params } = queries[queryIndex];
            connection.query(queryString, params, (queryErr, rows) => {
              if (queryErr) {
                connection.rollback(() => {
                  connection.release();
                  reject(queryErr);
                });
              } else {
                resultsArray.push(rows);
                executeQuery(queryIndex + 1);
              }
            });
          }
        };

        executeQuery(0);
      });
    });
  });
};