import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from '../environment.json';

import Recipe from './models/Recipe';
import { routes } from './routes/route';
//import getRoute from './routes/get';
//import deleteRoute from './routes/delete';

const app = express();

const MONGO_URI = env.MONGO_URI || '';
const PORT = env.BACKEND.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
}));

// Routes
app.use('/', routes);
//app.use('/', getRoute);
//app.use('/', deleteRoute);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err: any) => console.log(err));

