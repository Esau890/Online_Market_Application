require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const Product = require('./models/products'); 
const routes = require('./routes/routes');
const app = express(); 

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the main page of your API!');
});

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Marketplace' });
        console.log('MongoDB Connected to Marketplace Database');

        app.listen(3000, () => {
            console.log(`Server Started at ${3000}`);
        });
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};

connectToDatabase();