import express, { Router } from 'express';
export const getAllRoute = Router();
import Recipe from '../models/Recipe';

getAllRoute.get("/getAll", async (req, res) => {
    try { 
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        console.error('error: ' + err);
        res.status(400).json({
            message: "error"
        })
    }
});