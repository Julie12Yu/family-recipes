import './MakeRecipe.css'
import {useState, useEffect} from 'react';

type TRecipe = {
    name: string;
    _id: string;
}

function MakeRecipe() {
    // Array destructuring!
    // stateValue, dispatcher
    const [allRecipes, setRecipes] = useState<TRecipe []>([]);
    const [name, setName] = useState('');

  // empty dependency array: only runs when mounts and demounts
  // can't use async await
  useEffect(() => {
    async function fetchRecipes() {
        const allRecipes = await fetch("http://localhost:8000/getAll")
        .then( res => res.json());
        setRecipes(allRecipes);
        console.log(allRecipes);
    }
    fetchRecipes();
  }, []);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    const requestData = { name: name };
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
    const requestData = {
      name: "eeee",
    };
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
        <ul className="recipes">
            {allRecipes.map((recipe) => (
                <li key={recipe._id}>{recipe.name}</li>
            ))}
        </ul>
        <div>
            <form onSubmit={handlePost}> 
                <label htmlFor="recipe-name">Recipe Name</label> 
                <input 
                    id="recipe-name" // if we click on name, it auto-leads to the text box
                    value={name} // this allows react to have the text box show our changes
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    {setName(e.target.value)}}/>
                <button>Add Recipe!</button>
            </form>
            <button onClick={() => handleDelete()}>Delete 'eeee' recipe :D</button>
        </div>
    </>
  )
  
  }

export default MakeRecipe