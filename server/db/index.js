const mysql = require('mysql');

const conn = mysql.createPool({
    connectionLimit: 5,
    password: '',
    user: 'root',
    database: 'budget',
    host: 'localhost',
    port: '3306'
});

let budgetDB = {};

budgetDB.all = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM transactions`, (err, res) => {
            if (err) return reject(err);

            return resolve(res);
        });
    });
}

budgetDB.one = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM transactions WHERE tx_id = ?`, [id], (err, res) => {
            if (err) return reject(err);

            return resolve(res);
        });
    });
}

module.exports = budgetDB;