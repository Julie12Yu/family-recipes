import './ViewRecipes.css';
import {useState, useEffect} from 'react';
import {Ingredient} from '../Ingredient';
import { TRecipe } from './api/getRecipes';



function SingleRecipe(recipe: TRecipe) {
    const name : string = recipe.name;
    const ingredients: Ingredient[] = recipe.ingredients;
    const instructions : string = recipe.instructions;
    // Array destructuring!
    // stateValue, dispatcher
  
    const renderIngredients = () : JSX.Element => {
        const displayIngredients: JSX.Element[] = [];
        for (let i: number = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const amount = ingredient.amount;
            const unit = ingredient.unit;
            const ingredientName = ingredient.ingredient;
            displayIngredients.push(<div>Amount: {amount} | Unit: {unit} | Ingredient: {ingredientName}</div>);
        }
        return (
          <div>{displayIngredients}</div>
        )
      }

    
  return (
    <>
      {renderIngredients}
    </>
  )
  
  }

export default SingleRecipe