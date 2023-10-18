const express = require('express');
const router = express.Router();
const mockData = require('../models/transactions')

        router.get('/', (req, res) => {
            try {
                res.json(mockData); 
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        
       