const express = require('express');
const app = express();
const transactions = require('./controllers/transactionsController');
 
app.use(express.json());


app.use("/transactions", transactions);

app.use((req, res) => {
  // console.log('Catch-All Route Reached');
  res.status(404).send('<h1> "404_Not_Found"</h1>');
});

module.exports = app