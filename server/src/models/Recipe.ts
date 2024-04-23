import mongoose from 'mongoose';
import { Ingredient } from '../Ingredient';
// TODO: Figure out the schema of the item that we want to insert to the database
const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [] as Ingredient[],
});


export default mongoose.model('Recipe', RecipeSchema);

