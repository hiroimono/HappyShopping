import express from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';

// import reducDevTools from '@redux-devtools/cli';
// reducDevTools({ hostname: 'localhost', port: 8000 });

import colors from 'colors';

import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

config();
connectDB();
const app = express();
app.use(express.json());

/** Routes */
app.get('/', (req, res) => res.send('API is running!'))


/** Middlewares */
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
// app.use('/api/cart', cartRouter);
app.use(notFound);
app.use(errorHandler);

// app.post('/api/product', (req, res) => {
//     let product = products.find(product => product._id === req.params.id);
//     res.json(product);
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Backend Sever is running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold))