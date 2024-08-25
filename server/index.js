import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// MIDDLEWARES
// for Parsing Request Body with JSON
app.use(bodyParser.json());

// for Handling CORS Policy
app.use(cors());
app.use(
  cors({
    origin: 'https://bookstore-land.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

if (!mongoDBURL) {
  console.error("MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  return res.status(200).send('Welcome to Book Store');
});

app.use('/books', booksRoute);
// ALTERNATE WAY TO SET UP THE /books ROUTE
// app.use('/books', (req, res, next) => {
//   booksRoute(req, res, next);
// });


// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`Server Running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//listen port
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});