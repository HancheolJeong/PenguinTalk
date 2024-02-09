const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
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

const resultsArray = [];

// exports.transaction = (queries) => {
//   return new Promise((resolve, reject) => {
//     this.connection.beginTransaction((err) => { //트랜잭션 시작
//       if (err) throw err;
//       const executeQuery = (queryIndex) => {
//         if (queryIndex === queries.length) { //마지막 루프 일때는 커밋한다.
//           this.connection.commit((commitErr) => {
//             if (commitErr) {
//               this.connection.rollback(() => {
//                 reject(resultsArray);
//               });
//             } else {
//               resolve("Transaction successfully completed.");
//             }
//           });
//         } else { // 마지막 루프를 제외한 전부는 이쪽으로..
//           const { queryString, params } = queries[queryIndex];
//           this.connection.query(queryString, params, (queryErr, rows) => {
//             if (queryErr) {
//               this.connection.rollback(() => {
//                 reject(queryErr);
//               });
//             } else {
//               resultsArray.push(rows);
//               executeQuery(queryIndex + 1);
//             }
//           });
//         }
//       };

//       executeQuery(0); // Start executing queries
//     });
//   });
// };


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