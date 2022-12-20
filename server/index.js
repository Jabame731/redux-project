import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from './routes/authRoute.js';

const app = express();
dotenv.config();

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//connect to MongoDB
const connectionToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected to MONGODB');
  } catch (error) {
    console.log(error);
  }
};

//routes
app.use('/user', authRoute);

const port = process.env.PORT;

mongoose.set('strictQuery', true);

mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.listen(port, () => {
  connectionToDB();
  console.log(`connected to Port ${port}`);
});
