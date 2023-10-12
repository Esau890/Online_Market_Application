const express = require('express');
const router = express.Router()
const { MongoClient, ObjectID } = require('mongodb');


router.get('/products', async (req, res) => {
    res.send('Get all products');
  });
  
  router.get('/products/:id', async (req, res) => {
    res.send('Get product by ID');
  });
  
  router.post('/products', async (req, res) => {
    res.send('Add new product');
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
  
  router.get('/products/search/:name', async (req, res) => {
    res.send('Find products by name');
  });

module.exports = router;


