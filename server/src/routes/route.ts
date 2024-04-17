import express from 'express';
import {postRoute} from './post';
import {deleteRoute} from './delete';

// is middleware? unclear
export const routes = express.Router();
routes.use(postRoute);
routes.use(deleteRoute);
