import {Ingredient} from '../../Ingredient';
import { API_URL } from './config';

export type TRecipe = {
    name: string;
    ingredients: Ingredient[];
    _id: string;
    instructions: string;
}

export async function getRecipe(recipeName: string): Promise<TRecipe[]> 
{
    const recipe = await fetch(`${API_URL}/getRecipe/?` + new URLSearchParams({name: recipeName}), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then( res => res.json())
        .catch((e: Error) => console.log("Error: GET /getRecipe, " +  e.message));

    return recipe;
}