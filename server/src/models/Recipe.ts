import mongoose from 'mongoose';
// TODO: Figure out the schema of the item that we want to insert to the database
const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: {String: String},
});


export default mongoose.model('Recipe', RecipeSchema);
