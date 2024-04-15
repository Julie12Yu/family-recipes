import express from 'express';
import {postRoute} from './post';

export const routes = express.Router();
routes.use(postRoute);

