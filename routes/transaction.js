const express = require('express');
const router = express.Router();
const db = require('../models/transactions');

router.get('/', async (req, res) => {
    try{
        const transactions = await db.transactions.findALL();
        res.json(transactions);
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router; 