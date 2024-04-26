import './ViewRecipes.css';
import {useState, useEffect} from 'react';
import {Ingredient} from '../Ingredient';

type TRecipe = {
    name: string;
    ingredients: Ingredient[];
    _id: string;
}

function ViewRecipes() {
    // Array destructuring!
    // stateValue, dispatcher
    const [allRecipes, setRecipes] = useState<TRecipe []>([]);
    const [addName, setName] = useState('');

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
    const req = { name: addName };
    const res = await fetch('http://localhost:8000/put', {
      method: 'PUT',
      body: JSON.stringify(req),
      headers: { // headers let us tell a lot of things
      'Content-Type': 'application/json', //this tells what we're passing thru
    }})
    // optimistic update
    const recipe = await res.json();
    setRecipes([...allRecipes, recipe]);
    setName('');

  }

  async function handleDelete(removeName: string ) {
    const req = { name: removeName };
    fetch ('http://localhost:8000/delete', {
      method: 'DELETE',
      body: JSON.stringify(req),
      headers: {
      'Content-Type': 'application/json',
      }});
    // optimistic update
    setRecipes(allRecipes.filter((recipe) => removeName !== recipe.name));
  }

  return (
    <>
      <div className="makeRecipe">
        <ul className="recipes">
            {allRecipes.map((recipe) => (
                <li key={recipe._id}><button onClick={() => {handleDelete(recipe.name)}}>x</button>{recipe.name}</li>
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