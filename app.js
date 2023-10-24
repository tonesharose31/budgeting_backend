const express = require('express');
const app = express();
const transactions = require('./controllers/transactionsController');
 
app.use(express.json());

app.use((req, res) => {
  res.status(404).send('<h1> "404_Not_Found"</h1>');
});

app.use("/transactions", transactions);


module.exports = app