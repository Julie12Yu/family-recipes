import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from '../environment.json';

import { routes } from './routes/route';
//import getRoute from './routes/get';
//import deleteRoute from './routes/delete';

const app = express();

const MONGO_URI = env.MONGO_URI || '';
const PORT = env.BACKEND.PORT || 8000;

// Middleware
app.use(bodyParser.json());
// why doink is we use CORS?
/* CORS error ---
 tl;dr: by default, browser cannot access url that does not match host-name
        CORS lets us bypass that. we like cors usually, but we don't need that security b/c we're doing everything locally
 */ 
app.use(cors({
  origin: '*',
}));


// Routes
app.use('/', routes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err: any) => console.log(err));

