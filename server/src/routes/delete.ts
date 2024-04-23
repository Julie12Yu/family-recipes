import express, { Router } from 'express';
export const deleteRoute = Router();
import Recipe from '../models/Recipe';

deleteRoute.delete("/delete", async (req, res) => {
    try {
        const {name} = req.body;
        console.log("Handling DELETE request for /DELETE");
        const result = await Recipe.deleteOne({name: name});
        /* Print a message that indicates whether the operation deleted a
        document */
        if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
        } else {
        console.log("No documents matched the query. Deleted 0 documents.");
    }} catch (err) {
        console.error('error: ' + err);
        res.status(400).json({
          message: "error"
        }
    )}
  });
  
  