const express = require('express');
const router = express.Router();
const mockData = require('../models/transactions');
const transactions = require('../controllers/transactionsController');

router.get('/', async (req, res) => {
    try {
        const transactions = await db.getAllTransactions();
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

transactions.post('/transactions', (req, res) => {
    try{
        const newTransaction = req.body;
        mockData.push(newTransaction);
        
        res.json({ message: 'Transaction added successfully', data: newTransaction});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = transactions; 


        
       