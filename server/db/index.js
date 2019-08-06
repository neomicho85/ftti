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

// get all transactions
budgetDB.transactions_all = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM transactions`, (err, res) => {
            if (err) return reject(err);

            return resolve(res);
        });
    });
}

// insert bulk transactions
budgetDB.transactions_insert_bulk = (transactions) => {
    const query = 'INSERT INTO transactions(date,description, amount, balance)  VALUES ?'

    return new Promise((resolve, reject) => {
        conn.query(query, [transactions], (error, results, fields) => {
            if (error) return reject(error);

            return resolve(results.affectedRows);
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