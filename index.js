require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const routes = require('./routes/routes');

const app = express(); // Define the express app first

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the main page of your API!');
});

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');

    // Move the app.listen here
    app.listen(3000, () => {
        console.log(`Server Started at ${3000}`);
    });
});
