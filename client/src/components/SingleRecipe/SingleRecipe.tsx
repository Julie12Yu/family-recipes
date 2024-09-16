import './SingleRecipe.css';
import {Ingredient} from '../../Ingredient';
import { TRecipe } from '../api/getRecipes';

interface SingleRecipeProps {
    recipe: TRecipe;
  }

function SingleRecipe(props: SingleRecipeProps) {
    const name : string = props.recipe.name;
    const ingredients: Ingredient[] = props.recipe.ingredients;
    const instructions : string = props.recipe.instructions;
  
    const renderIngredients = (): JSX.Element => {
      const displayIngredients: JSX.Element[] = [];
    
      for (let i: number = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        const amount = ingredient.amount ? `Amount: ${ingredient.amount}` : '';
        const unit = ingredient.unit ? `Unit: ${ingredient.unit}` : '';
        const ingredientName = `Ingredient: ${ingredient.ingredient}`;
    
        // Construct the ingredient string, showing only non-empty fields
        const ingredientDisplay = [amount, unit, ingredientName].filter(Boolean).join(' | ');
    
        displayIngredients.push(<div key={i}>{ingredientDisplay}</div>);
      }
    
      return <div>{displayIngredients}</div>;
    };
    

    
  return (
    <>
      <h1>{name}</h1>
      {renderIngredients()}
      <p>{instructions}</p>
    </>
  )
  
  }

export default SingleRecipe