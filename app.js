const express = require('express');
const app = express();
const transactions = require('./controllers/transactionsController');
 
app.use(express.json());


app.use("/transactions", transactions);

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

module.exports = app