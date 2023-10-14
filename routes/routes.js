const express = require('express');
const router = express.Router()
const product = require('../models/products'); 
const { MongoClient, ObjectID } = require('mongodb');


router.get('/products', async (req, res) => {
    try {
        const data = await product.find()
        res.json(data)
    } catch (err) {
        res.json({ message: err })
    }
  });
  
  router.get('/products/:id', async (req, res) => {
    res.send('Get product by ID');
  });
  
  router.post('/products', async (req, res) => {
    const data = new product({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description
    });

    try {
        const savedData = await data.save();
        res.status(201).json(savedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving to the database' });
    
    }
});

  
  router.put('/products/:id', async (req, res) => {
    res.send('Update product by ID');
  });
  
  router.delete('/products/:id', async (req, res) => {
    res.send('Delete product by ID');
  });
  
  router.delete('/products', async (req, res) => {
    res.send('Delete all products');
  });
  router.get('/products', async (req, res) => {
    res.send('Find products by name');
    
  });

module.exports = router;


