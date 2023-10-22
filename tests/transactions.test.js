
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
    describe('POST', () => {
      it('sends the transactions array', async () => {
        const response = await request(app).get('/transactions');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
      });
    });

    it('returns 400 when required fields are missing', async () => {
        const newTransaction = {
            id: 123,
            amount: 100,
            date: '2023-10-15',
            from: 'Sample Source',
        };

        const response = await request(app).post('/transactions').send(newTransaction);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Missing required fields');
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
        it('updates the transaction at the index in the transactions array', async () => {
            const index = 0;
            const updatedTransaction = {
                id: 154,
                iten_name: 'Salary',
                amount: 500,
                date: '2023-10-15',
                from: 'Employer Inc',
                category: 'Income',
            };
    
            const response = await request(app).put(`/transactions/${index}`).send(updatedTransaction);
            expect(response.status).toBe(200); 
            expect(mockData[index]).toEqual(updatedTransaction);
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
