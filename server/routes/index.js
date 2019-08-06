const express = require('express');
const db = require('../db');
const fileJSON = require('../data/transactions.json');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let result = await db.transactions_all();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let result = await db.one(req.params.id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get transactions from json file
router.get('/tx/raw', (req, res, next) => {
    res.json(fileJSON);
});

// insert transactions in db
router.post('/tx/exportToMysql', async (req, res, next) => {
    try {

        const data = req.body.map(tx => {
            return [
                tx.Date,
                tx.Description.replace(/\s+/g," "),
                tx.Credit ? tx.Credit : `-${tx.Debit}`,
                tx.Balance ? tx.Balance : 0.00,
            ]
        });

        let result = await db.transactions_insert_bulk(data);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



module.exports = router;