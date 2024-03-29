import express from 'express';
import path from 'path';
import { config } from 'dotenv';
import connectDB from './config/db.js';

import colors from 'colors';

import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import configRouter from './routers/configRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Router Middlewares */
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/config', configRouter);
app.use('/api/uploads', uploadRouter);
// app.use('/api/cart', cartRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

/** Not found pages and Error Handler Middlewares */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Backend Sever is running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;