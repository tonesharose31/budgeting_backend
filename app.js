const express = require('express');
const app = express();

const transactionsRouter = require('./routes/transaction');
app.use('/transactions', transactionsRouter);


const seedDatabase = require("./seed/seed");
seedDatabase();

module.exports = app