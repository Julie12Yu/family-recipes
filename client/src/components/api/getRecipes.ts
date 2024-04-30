import {Ingredient} from '../../Ingredient';
import { API_URL } from './config';

export type TRecipe = {
    name: string;
    ingredients: Ingredient[];
    _id: string;
}

export async function getRecipes(): Promise<TRecipe[]> {
    const allRecipes = await fetch(`${API_URL}/getAll`)
        .then( res => res.json())
        .catch((e: Error) => console.log("Error: GET /getAll, " +  e.message));

    return allRecipes;
}