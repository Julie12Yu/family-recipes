import './ViewRecipes.css';
import {useState, useEffect} from 'react';
import {Ingredient} from '../Ingredient';
import { deleteRecipe } from './api/deleteRecipe';
import { editRecipe } from './api/editRecipe';
import { TRecipe, getRecipes } from './api/getRecipes';

interface CallBack {
  (): void;
}

interface ViewRecipesProps {
  returnToViewRecipe: CallBack;
}

function ViewRecipes(props: ViewRecipesProps) {
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


  /*
  --
    Allows for adding an individual recipe by it's name.
    Takes name from addName class constant.
    Utilizes optimistic updates to add the recipe name to allRecipes.
  --
    e: React.FormEvent: The button press of the form.
  */
  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    // optimistic update
    const recipe = await editRecipe(addName);
    setRecipes([...allRecipes, recipe]);
    setName('');

  }


  /*
  --
    Allows for deleting individual recipe 'cards'.
    Utilizes optimistic updates to remove the recipe name from allRecipes.
  --
    removeName: String: Name of recipe to be removed. Recipes should be unique
  */
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
                <li key={recipe._id}>
                    <button onClick={() => {handleDelete(recipe.name)}}>x</button>
                    {recipe.name}
                </li>
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