const express = require('express');
const router = express.Router();
const db = require('../models/transactions');

router.get('/:id', async (req, res) => {
    try{
        const transactionId =req.params.id;
        const transaction = await db.transactions.findOne({where: {id: transactionId}});
       
        if (!transaction) {
            res.status(404).json({ error: 'Transaction not found' });
        } else {
            res.json(transaction);
        }
       
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router; 