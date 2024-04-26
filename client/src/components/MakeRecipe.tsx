import './MakeRecipe.css';
import {useState} from 'react';
import { Ingredient } from '../Ingredient';

function MakeRecipe() {
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([{amount: "", unit: "", ingredient: ""}]);
    const [name, setName] = useState("");

    async function submitRecipe() {
        const requestData = { name: name, ingredients : ingredientList };
        await fetch('http://localhost:8000/put', {
          method: 'PUT',
          body: JSON.stringify(requestData),
          headers: { // headers let us tell a lot of things
          'Content-Type': 'application/json', //this tells what we're passing thru
        }})
      }

    async function handleNewIngredient(e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        e.preventDefault();
        const newList = [...ingredientList];
        newList.push({amount: "", unit: "", ingredient: ""});
        setIngredientList(newList);
    }

    async function deleteIngredient(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) {
        e.preventDefault();
        const newList = [...ingredientList];
        if (newList.length > 1) {
            newList.splice(i,1);
        }
        setIngredientList(newList);
    }

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
                        value={ingredientList[i].unit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientUnitChange(e, i)}}/>
                    <button onClick={(e) => {handleNewIngredient(e)}}>Add Ingredient</button>
                    <button onClick={(e) => {deleteIngredient(e, i)}}>x</button>
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
    <form className="addRecipe"> 
        <label htmlFor="recipe-name">Recipe Name</label> 
        <input 
            id="recipe-name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            {setName(e.target.value)}}/>
    </form>
    {renderIngredients()}
    <form>
    <button onClick={() => {submitRecipe()}}>Submit Recipe</button>
    </form>
    </>
  )
  
  }

export default MakeRecipe