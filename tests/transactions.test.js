
const express = require('express');
const request = require('supertest');
const app = require('../app');
let mockData = require('../models/transactions');

const transactionsRouter = require('../controllers/transactionsController'); 


app.use('/transactions', transactionsRouter);

describe('transactions', () => {
  let originalTransactionsArray;

  beforeEach(() => {
    originalTransactionsArray = [...mockData];
  });

  afterEach(() => {
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
            const newTransaction = {
                id: 123,
                item_name: 'Sample Item',
                amount: 100,
                date: '2023-10-15',
                from: 'Sample Source',
                category: 'Sample Category'
            };
            const response = await request(app).post('/transactions').send(newTransaction);
    expect(response.status).toBe(201);
    expect(mockData).toContainEqual(newTransaction);
});
    
        it('returns 400 when required fields are missing', async () => {
            const newTransaction = { 
                 id: 123,
                amount: 100,
                date: '2023-10-15',
                from: 'Sample Source',
                category: 'Sample Category'
            }; 
            const response = await request(app).post('/transactions').send(newTransaction);
            expect(response.status).toBe(400);
        });
    });


  describe('/transactions/:index', () => {
    describe('GET', () => {
      it('sends the corresponding transaction when a valid index is given', async () => {
        const index = 0; 
        const response = await request(app).get(`/transactions/${index}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData[index]);
      });

      it('sends a redirect when an invalid index is given', async () => {
        const index = -1; 
        const response = await request(app).get(`/transactions/${index}`);
        expect(response.status).toBe(404);
      });
    });

    describe('PUT', () => {
        it('deletes at the index in the transactions array', async () => {
            const index = 0;
            const response = await request(app).delete(`/transactions/${index}`);
            expect(response.status).toBe(204); // Correct status code for deletion
            expect(mockData).not.toContainEqual(originalTransactionsArray[index]);
          });
      });

      describe('DELETE', () => {
        it('deletes at the index in the transactions array', async () => {
            const index = 0;
            const response = await request(app).delete(`/transactions/${index}`);
            expect(response.status).toBe(204);
            expect(mockData).not.toContainEqual(originalTransactionsArray[index]);
        });
    
        it('returns 404 when the index is out of bounds', async () => {
            const index = mockData.length + 1;
            const response = await request(app).delete(`/transactions/${index}`);
            expect(response.status).toBe(404);
        });
    });
          
    });
  });
});
