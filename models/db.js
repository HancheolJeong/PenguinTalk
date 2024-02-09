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
          if (queryIndex === queries.length) { //마지막 재귀 함수
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





exports.commentTransaction = (queries, taggedUsers) => {
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
        let id = 0;

        const executeQuery = (queryIndex) => {
          if(resultsArray.length == 1)
          {
            id = resultsArray[0].insertId //INSERT된 id를 저장하고
            for(let i = 0; i < taggedUsers.length; i++) // 다음 comment_id와 user_id를 queries에 값을 push한다.
            {
              queries.push({
                queryString: `INSERT INTO tags (comment_id, user_id) VALUES(?, ?)`,
                params:[id, taggedUsers[i]]
              });
            }
          }
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