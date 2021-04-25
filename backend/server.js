import express from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';

config();
connectDB();
const app = express();
import products from './data/products.js';

app.get('/', (req, res) => res.send('API is running!'))

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    let product = products.find(product => product._id === req.params.id);
    res.json(product);
})

// app.post('/api/product', (req, res) => {
//     let product = products.find(product => product._id === req.params.id);
//     res.json(product);
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Backend Sever is running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold))