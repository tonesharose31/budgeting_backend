const express = require('express');
const app = express();
const transactions = require('./controllers/transactionsController');
 
app.use(express.json());


app.use("/transactions", transactions);

module.exports = app