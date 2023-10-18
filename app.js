const express = require('express');
const app = express();

const seedDatabase = require("./seed/seed");
seedDatabase();

const transactionsRouter = require('./routes/transactions');

app.use('/transactions', transactions);



module.exports = app