import express from 'express';
import {putRoute} from './put';
import {deleteRoute} from './delete';
import {getAllRoute} from './getAll';
import {getRecipeRoute} from './getRecipe';
import {loginRoute} from './login';

// is middleware? unclear
export const routes = express.Router();
routes.use(putRoute);
routes.use(deleteRoute);
routes.use(getAllRoute);
routes.use(getRecipeRoute);
routes.use(loginRoute);