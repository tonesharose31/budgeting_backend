
const express = require('express');
const request = require('supertest');
const app = require('../app');
let mockData = require('../models/transactions');

// Import your transactions routes or controllers
const transactionsRouter = require('../controllers/transactionsController'); // Update the path accordingly

// Attach the routes to the Express app
app.use('/transactions', transactionsRouter);

describe('transactions', () => {
  let originalTransactionsArray;

  beforeEach(() => {
    // Store the original state of the transactions array
    originalTransactionsArray = [...mockData];
  });

  afterEach(() => {
    // Restore the original state of the transactions array
    mockData = originalTransactionsArray;
  });

  describe('/transactions', () => {
    describe('GET', () => {
      it('sends the transactions array', async () => {
        const response = await request(app).get('/transactions');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
      });
    });

    describe('POST', () => {
      it('adds new transaction to the end of transactions array', async () => {
        const newTransaction = { /* Your new transaction data here */ };
        const response = await request(app).post('/transactions').send(newTransaction);
        expect(response.status).toBe(201);
        expect(mockData).toContainEqual(newTransaction);
      });
    });
  });

  describe('/transactions/:index', () => {
    describe('GET', () => {
      it('sends the corresponding transaction when a valid index is given', async () => {
        const index = 0; // Replace with a valid index
        const response = await request(app).get(`/transactions/${index}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData[index]);
      });

      it('sends a redirect when an invalid index is given', async () => {
        const index = -1; // Replace with an invalid index
        const response = await request(app).get(`/transactions/${index}`);
        expect(response.status).toBe(404);
        // Check if the response body contains an error message or it depends on your implementation
      });
    });

    describe('PUT', () => {
      it('replaces the index in the transactions array', async () => {
        const index = 0; // Replace with a valid index
        const updatedTransaction = { /* Your updated transaction data here */ };
        const response = await request(app).put(`/transactions/${index}`).send(updatedTransaction);
        expect(response.status).toBe(200);
        expect(mockData[index]).toEqual(updatedTransaction);
      });
    });

    describe('DELETE', () => {
      it('deletes at the index in the transactions array', async () => {
        const index = 0; // Replace with a valid index
        const response = await request(app).delete(`/transactions/${index}`);
        expect(response.status).toBe(204);
        expect(mockData).not.toContainEqual(originalTransactionsArray[index]);
      });
    });
  });
});
