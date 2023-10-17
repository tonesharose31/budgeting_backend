const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
    try{
        const transactions = await db.Transaction.findALL();
        res.json(transactions);
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});