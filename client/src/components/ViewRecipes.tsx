import './ViewRecipes.css';
import {useState, useEffect} from 'react';
import {Ingredient} from '../Ingredient';
//import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

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
//const [unit, setUnit] = useState<string[]>([]);

function ViewRecipes() {
    // Array destructuring!
    // stateValue, dispatcher
    const [allRecipes, setRecipes] = useState<TRecipe []>([]);
    const [addName, setName] = useState('');
    const [removeName, elimName] = useState('');

  // empty dependency array: only runs when mounts and demounts
  // can't use async await
  useEffect(() => {
    async function fetchRecipes() {
        const allRecipes = await fetch("http://localhost:8000/getAll")
        .then( res => res.json())
        .catch((e: Error) => console.log("Error: GET /getAll, " +  e.message));
        setRecipes(allRecipes);
        console.log(allRecipes);
    }
    fetchRecipes();
  }, []);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    const requestData = { name: addName };
    await fetch('http://localhost:8000/post', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: { // headers let us tell a lot of things
      'Content-Type': 'application/json', //this tells what we're passing thru
    }})
    .then(handleNewPost);

    function handleNewPost(){
      setName('');
    }
  }

  async function handleDelete() {
    const requestData = { name: removeName };
    fetch ('http://localhost:8000/delete', {
      method: 'DELETE',
      body: JSON.stringify(requestData),
      headers: {
      'Content-Type': 'application/json',
    },
  })
  }

  return (
    <>
      <div className="makeRecipe">
        <ul className="recipes">
            {allRecipes.map((recipe) => (
                <li key={recipe._id}>{recipe.name}</li>
            ))}
        </ul>
        <div>
            <form className="addRecipe" onSubmit={handlePost}> 
                <label htmlFor="recipe-name">Recipe Name</label> 
                <input 
                    id="recipe-name" // if we click on name, it auto-leads to the text box
                    value={addName} // this allows react to have the text box show our changes
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    {setName(e.target.value)}}/>
                <button>Add Recipe</button>
            </form>
        </div>
        <div>
            <form className="deleteRecipe" onSubmit={handleDelete}> 
                <label htmlFor="recipe-name">Recipe Name</label> 
                <input 
                    id="recipe-name" // if we click on name, it auto-leads to the text box
                    value={removeName} // this allows react to have the text box show our changes
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    {elimName(e.target.value)}}/>
                <button>Delete Recipe</button>
            </form>
        </div>
      </div>
    </>
  )
  
  }

export default ViewRecipes