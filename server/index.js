import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// MIDDLEWARES
// for Parsing Request Body with JSON
app.use(express.json());
// for Handling CORS Policy
app.use(cors());
app.use(
  cors({
    origin: 'https://bookstore-land.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (req, res) => {
  return res.status(200).send('Welcome to Book Store');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
