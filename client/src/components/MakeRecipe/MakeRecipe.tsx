import './MakeRecipe.css';
import {useState} from 'react';
import { TRecipe } from '../api/getRecipes';
import { Ingredient } from '../../Ingredient';
import DeleteIcon from '@mui/icons-material/Delete';

// preps callback function that lets us return to the ViewRecipes page
// preps type for callback function that allows us to swap page back, without abusing the 'button' usage that auto refreshes
interface CallBack {
    (): void;
}

interface MakeRecipeProps {
    returnToViewRecipe: CallBack;
    prevRecipe?: TRecipe;
}

function MakeRecipe(props: MakeRecipeProps) {
    const [ingredientList, setIngredientList] = useState<Ingredient[]>(props.prevRecipe?.ingredients || [{amount: "", unit: "", ingredient: ""}]);
    const [name, setName] = useState(props.prevRecipe?.name || "");
    const [instructions, setInstructions] = useState(props.prevRecipe?.instructions || "");

    // TODO: Make this an API thing
    async function submitRecipe(e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        e.preventDefault();
        const requestData = { name: name, ingredients : ingredientList, instructions: instructions };
        await fetch('https://family-recipes-nu.vercel.app/put', {
          method: 'PUT',
          body: JSON.stringify(requestData),
          headers: { // headers let us tell a lot of things
          'Content-Type': 'application/json', //this tells what we're passing thru
        }})

        props.returnToViewRecipe();
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
            newList.splice(i,1); // splice allows us to remove from array b/c js :C
        } else {
            window.confirm("Cannot delete all ingredients!");
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
                    
                    <label htmlFor="ingredient-unit">Unit:</label> 
                    <input 
                        className='input'
                        key={i+100}
                        id="ingredient-unit"
                        value={ingredientList[i].unit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientUnitChange(e, i)}}/>   

                    <label htmlFor="ingredient-name">Ingredient:</label> 
                    <input 
                        className='input'
                        key={i+10}
                        id="ingredient-name"
                        value={ingredientList[i].ingredient}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientNameChange(e, i)}}/>
                    
                    <button onClick={(e) => {handleNewIngredient(e)}}>Add Ingredient</button>
                    <button className="remove-button" onClick={(e) => deleteIngredient(e, i)}>
                        <DeleteIcon />
                    </button>


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
                <label htmlFor="recipe-name">Recipe Name: </label> 
                <input 
                    id="recipe-name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    {setName(e.target.value)}}/>
            </form>
            {renderIngredients()}
            <form className="input"> 
                <label htmlFor="recipe-name">Instructions</label> 
                <br/>
                <textarea 
                    id="recipe-name"
                    value={instructions}
                    onChange={(e) => 
                    {setInstructions(e.target.value)}}
                    rows={4}
                    cols={50}
                    />
                    
            </form>
            <form>
                <button onClick={(e) => {submitRecipe(e)}}>Save Recipe</button>
            </form>
        </>
    )
  }

export default MakeRecipe