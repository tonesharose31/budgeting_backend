const express = require('express');
const app = express();

const transactions = require("./controllers/transactionsController");

module.exports = app