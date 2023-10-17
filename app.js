const express = require('express');
const app = express();
const transactions = require("./controllers/transactionsController");

const seedDatabase = require("./seed/seed")
seedDatabase();

module.exports = app