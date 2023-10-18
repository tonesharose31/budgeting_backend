const express = require('express');
const router = express.Router();
const mockData = require('../models/transactions');

router.get('/', async (req, res) => {
    try {
        const transactions = await db.getAllTransactions();
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

        
       