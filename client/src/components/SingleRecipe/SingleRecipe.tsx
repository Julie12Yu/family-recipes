import './SingleRecipe.css';
import {useState, useEffect} from 'react';
import {Ingredient} from '../../Ingredient';
import { TRecipe } from '../api/getRecipes';

interface SingleRecipeProps {
    recipe: TRecipe;
  }

function SingleRecipe(props: SingleRecipeProps) {
    const name : string = props.recipe.name;
    const ingredients: Ingredient[] = props.recipe.ingredients;
    const instructions : string = props.recipe.instructions;
    // Array destructuring!
    // stateValue, dispatcher
  
    const renderIngredients = () : JSX.Element => {
        const displayIngredients: JSX.Element[] = [];
        for (let i: number = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const amount = ingredient.amount;
            const unit = ingredient.unit;
            const ingredientName = ingredient.ingredient;
            displayIngredients.push(<div key={i}>Amount: {amount} | Unit: {unit} | Ingredient: {ingredientName}</div>);
        }
        return (
          <div>{displayIngredients}</div>
        )
    }

    
  return (
    <>
      <h1>{name}</h1>
      {renderIngredients()}
      <p>{instructions}</p>
    </>
  )
  
  }

export default SingleRecipe