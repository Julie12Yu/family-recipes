import './ViewRecipes.css';
import {useState, useEffect} from 'react';
import {Ingredient} from '../Ingredient';
import {Link} from "react-router-dom";
import { deleteRecipe } from './api/deleteRecipe';
import { editRecipe } from './api/editRecipe';
import { TRecipe, getRecipes } from './api/getRecipes';


function ViewRecipes() {
    // Array destructuring!
    // stateValue, dispatcher
  const [allRecipes, setRecipes] = useState<TRecipe []>([]);
  const [addName, setName] = useState('');

  // empty dependency array: only runs when mounts and demounts
  // can't use async await
  useEffect(() => {
    async function fetchRecipes() {
        const allRecipes = await getRecipes();
        setRecipes(allRecipes);
    }
    fetchRecipes();
  }, []);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    // optimistic update
    const recipe = await editRecipe(addName);
    setRecipes([...allRecipes, recipe]);
    setName('');

  }

  async function handleDelete(removeName: string ) {
    await deleteRecipe(removeName);
    // optimistic update
    setRecipes(allRecipes.filter((recipe) => removeName !== recipe.name));
  }

  return (
    <>
      <div className="makeRecipe">
        <ul className="recipes">
            {allRecipes.map((recipe) => (
                <li key={recipe._id}><button onClick={() => {handleDelete(recipe.name)}}>x</button><Link to={`recipes/${recipe.name}`}>{recipe.name}</Link></li>
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
      </div>
    </>
  )
  
  }

export default ViewRecipes