import './MakeRecipe.css';
import {useState, useEffect} from 'react';
import { Ingredient } from '../Ingredient';
import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

type TRecipe = {
    name: string;
    ingredients: Ingredient[];
    _id: string;
}

const units = [
  'milliliter',
  'liter',
  'teaspoon',
  'fluid ounce',
  'cup',
  'pint',
  'quart',
  'milligram',
  'gram',
  'kilogram',
  'pound',
  'ounce'
];

function MakeRecipe() {
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([{amount: "", unit: "", ingredient: ""}]);
    //const [unit, setUnit] = useState('');
    const renderIngredients = () => {
        const ingredientArr: JSX.Element[] = [];
        for (let i = 0; i < ingredientList.length; i++) {
            const element = (
            <ul>
                <form className="addIngredient" > 
                    <label htmlFor="ingredient-amount">Amount:</label> 
                    <input 
                        key={i}
                        id="ingredient-amount" // if we click on name, it auto-leads to the text box
                        value={ingredientList[i].amount} // this allows react to have the text box show our changes
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientAmountChange(e, i)}}/>
                    <label htmlFor="ingredient-name">Ingredient:</label> 
                    <input 
                        key={i}
                        id="ingredient-name" // if we click on name, it auto-leads to the text box
                        value={ingredientList[i].ingredient} // this allows react to have the text box show our changes
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        {handleIngredientNameChange(e, i)}}/>
                    <Box sx={{ minWidth: 120 }}>                        
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Units</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                >
                                    {units.map((unit, i) => (
                                    <MenuItem
                                    key={i}
                                    value={unit}
                                    >{unit}</MenuItem>
                                    ))}
                                </Select>
                        </FormControl>
                    </Box>
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