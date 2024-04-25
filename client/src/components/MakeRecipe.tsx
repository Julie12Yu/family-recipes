import './MakeRecipe.css';
import {useState} from 'react';
import { Ingredient } from '../Ingredient';

type TRecipe = {
    name: string;
    ingredients: Ingredient[];
    _id: string;
}

function MakeRecipe() {
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([{amount: "", unit: "", ingredient: ""}]);
    //const [unit, setUnit] = useState('');
    const renderIngredients = () => {
        const ingredientArr: JSX.Element[] = [];
        for (let i = 0; i < ingredientList.length; i++) {
            const element = (
            <ul className='ingredient'>
                <form > 
                    <label htmlFor="ingredient-amount">Amount:</label> 
                    <input 
                        className='input'
                        key={i}
                        id="ingredient-amount" // if we click on name, it auto-leads to the text box
                        value={ingredientList[i].amount} // this allows react to have the text box show our changes
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientAmountChange(e, i)}}/>
                    <label htmlFor="ingredient-name">Ingredient:</label> 
                    <input 
                        className='input'
                        key={i}
                        id="ingredient-name" // if we click on name, it auto-leads to the text box
                        value={ingredientList[i].ingredient} // this allows react to have the text box show our changes
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientNameChange(e, i)}}/>
                    <label htmlFor="ingredient-unit">Unit:</label> 
                    <input 
                        className='input'
                        key={i}
                        id="ingredient-unit" // if we click on name, it auto-leads to the text box
                        value={ingredientList[i].ingredient} // this allows react to have the text box show our changes
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientUnitChange(e, i)}}/>
                </form>
            </ul>);
            ingredientArr.push(element);
        }


        return <ul>{ingredientArr}</ul>
    }


    const handleIngredientAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newList = [...ingredientList];
        newList[index].amount = e.target.value;
        setIngredientList(newList);
    }

    const handleIngredientNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newList = [...ingredientList];
        newList[index].ingredient = e.target.value;
        setIngredientList(newList);
    }

    const handleIngredientUnitChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newList = [...ingredientList];
        newList[index].unit = e.target.value;
        setIngredientList(newList);
    }


    return (
    <>
    {renderIngredients()}
    </>
  )
  
  }

export default MakeRecipe