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
            <ul key={i}>
                <form className='ingredient' > 
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
                        key={i+10}
                        id="ingredient-name"
                        value={ingredientList[i].ingredient}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientNameChange(e, i)}}/>
                    <label htmlFor="ingredient-unit">Unit:</label> 
                    <input 
                        className='input'
                        key={i+100}
                        id="ingredient-unit"
                        value={ingredientList[i].ingredient}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientUnitChange(e, i)}}/>
                    <button onClick={(e) => {e.preventDefault(); console.log("eeeee")}}>Add Ingredient</button>
                </form>
            </ul>);
            ingredientArr.push(element);
        }
        return <ul key={-1}>{ingredientArr}</ul>
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