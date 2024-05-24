import express, { Router } from 'express';
export const loginRoute = Router();
import Recipe from '../models/Recipe';
//import env from "../../environment.json";
require('dotenv').config()

//Very bare minimum login system, should be upgraded in future.
loginRoute.post("/login", async (req, res) => {
    const {password} = req.body;
    if (password == process.env.PASSWORD) {
        res.send("CORRECT");
    } else {
        res.status(401).send("INCORRECT"); //401 is "Unauthorized"
    }
});