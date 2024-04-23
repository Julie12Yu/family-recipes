import './MakeRecipe.css';
import {useState, useEffect} from 'react';
import { Ingredient } from '../Ingredient';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

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
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    //const [unit, setUnit] = useState('');
    
    return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Units</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
        >
            {units.map((unit) => (
            <MenuItem
              key={unit}
            >
            </MenuItem>
          ))}
        </Select>
        </FormControl>
    </>
  )
  
  }

export default MakeRecipe