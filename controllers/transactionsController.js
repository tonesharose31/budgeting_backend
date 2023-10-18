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

module.exports = transactions;