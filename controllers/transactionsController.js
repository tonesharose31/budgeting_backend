const express = require('express');
const transactions = express.Router();
const mockData = require('../models/transactions')

function getData(req, res) {
    try {
      res.json(mockData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  transactions.get('/', getData);

  transactions.post('/', (req, res) => {
    const { id, item_name, amount, date, from_who, category } = req.body;
    console.log(req.body)
    const newTransaction = { id, item_name, amount, date, from_who, category,};
    mockData.push(newTransaction);
    res.status(201).json(newTransaction)

});

transactions.get("/:index", (req, res) => {
    const { index } = req.params;
    if(index < 0 || index >= mockData.length){
        res.redirect("/transactions")
    } else { 
        res.json(mockData[index]);
    }


    transactions.delete('/:index', (req, res) => {
        const { index } = req.params;
       if (index < 0 || index >= mockData.length){
            res.status(404).send("No mockdata found at index");
         } else {
            mockData.splice(index, 1);
            res.status(204).send();
        }
});

module.exports = transactions