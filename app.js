const express = require('express');
const transactionsController = require('./controllers/transactionsController');
const app = express();

app.use(express.json());
app.use("/transactions", );

module.exports = app