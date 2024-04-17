import express, { Router } from 'express';
export const postRoute = Router();
import Recipe from '../models/Recipe';

postRoute.post('/post', async (req, res) => {
    try {
        const {name, ingredients} = req.body;
        const newRecipe = new Recipe({
            name: name,
            ingredients: ingredients,
        });
        await newRecipe.save();
        res.json(newRecipe);
    } catch (err) {
        console.error('error: ' + err);
        res.status(400).json({
          message: "error"
        }
    )}
  });

  
  