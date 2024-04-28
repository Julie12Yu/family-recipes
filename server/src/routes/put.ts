import express, { Router } from 'express';
export const putRoute = Router();
import Recipe from '../models/Recipe';

putRoute.put('/put', async (req, res) => {
    try {
        const { name, ingredients, instructions} = req.body;
        const item = await Recipe.findOne({ name: name });
        if (!item) { //POST
            const newRecipe = new Recipe({
                name: name,
                ingredients: ingredients,
                instructions: instructions,
            });
            await newRecipe.save();
            res.json(newRecipe);
        } else { // PUT
          const editedItem = {
            name: name,
            ingredients: ingredients,
            instructions: instructions,
          };
          const result = await Recipe.findOneAndUpdate({ name: name }, { $set: editedItem }, { new: true });
          if (result) {
            res.send(`Recipe with name: ${name} has been updated!`);
          } else {
            res.status(404).send(`Recipe with mae: ${name} not found`);
          }
        }
      } catch (err) {
          console.error('error: ' + err);
          res.status(400).json({
            message: "error"
          }
      )}
    });