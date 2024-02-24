require('dotenv').config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit : 10,
  queueLimit : 0
});

exports.pool = pool.promise();

/**
 * 쿼리와 바인딩 될 매개변수로 SQL 쿼리를 실행
 * 비동기식 처리
 * @param {string} queryString : 쿼리
 * @param {array} params : 쿼리에 바인딩 될 매개 변수 
 * @returns 
 */
exports.executeQuery = (queryString, params) => {
  return new Promise((resolve, reject) => {
    pool.query(queryString, params, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};