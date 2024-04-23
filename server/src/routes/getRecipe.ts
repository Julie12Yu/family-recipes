import express, { Router } from 'express';
export const getRecipeRoute = Router();
import Recipe from '../models/Recipe';

getRecipeRoute.get("/getRecipe", async (req, res) => {
    try {
        const {name} = req.body;
        const recipes = await Recipe.find(name);
        res.json(recipes);
    } catch (err) {
        console.error('error: ' + err);
        res.status(400).json({
            message: "error"
        })
    }
});
