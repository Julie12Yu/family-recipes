import './App.css'
import {MouseEventHandler, useState} from 'react';
import MakeRecipe from './components/MakeRecipe/MakeRecipe';
import ViewRecipes from './components/ViewRecipes/ViewRecipes';
import { handleLoginAPI } from './components/api/handleLoginAPI';
import { TRecipe } from './components/api/getRecipes';
import SingleRecipe from './components/SingleRecipe/SingleRecipe';

type pages = "ViewRecipes" | "MakeRecipe" | "SignIn" | "SingleRecipe"; 
function App() {
  const [page, setPage] = useState<pages>("SignIn");
  const [password, setPassword] = useState("");  
  const [recipe, setRecentestRecipe] = useState<TRecipe>({name: "", ingredients: [{amount: "", unit: "", ingredient: ""}], _id: "", instructions: ""});

  function returnToViewRecipe() {
    setPage("ViewRecipes");
    resetRecipe();
  }

  function viewSingleRecipe(recipe: TRecipe) {
    setPage("SingleRecipe");
    setRecentestRecipe(recipe);
  }

  function editRecipe(recipe: TRecipe) {
    setRecentestRecipe(recipe);
    setPage("MakeRecipe");
  }

  function resetRecipe() {
    setRecentestRecipe({name: "", ingredients: [{amount: "", unit: "", ingredient: ""}], _id: "", instructions: ""});
  }

  const handleLogin : MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // just passes in the callback function! does not need special typing here
    handleLoginAPI(password, returnToViewRecipe);
  }

  if (page == "SignIn") {
    return (
      <>
        <form>
          <h2>Store Recipes Here</h2>
          <label>Password: </label>
          <input 
              id="password" 
              value={password} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              {setPassword(e.target.value)}}/>
          <button onClick={handleLogin}>Submit</button>
        </form>
      </>
    );
  }
  if (page == "ViewRecipes") {
    return ( //Add a readonly function here! Place it within "ViewRecipes" as a prop, and then modify each API call to check if readonly is true.
      <>
        <button className="navbarButton" onClick={() => setPage("MakeRecipe")}>New Recipe</button>
        <h1 className="header">Recipes</h1>
        <div className="recipes-wrapper">
          <ViewRecipes returnToViewRecipe={returnToViewRecipe} viewSingleRecipe={viewSingleRecipe} editRecipe={editRecipe}/>
        </div>
      </>
    )
  }
  if (page == "MakeRecipe") {
    return (
      <>
        <button className="navbarButton" onClick={() => {setPage("ViewRecipes"); resetRecipe()}}>Back</button>
        <MakeRecipe returnToViewRecipe={returnToViewRecipe} prevRecipe={recipe}/>
      </>
    )
  } 
  if (page == "SingleRecipe") {
    return (
      <>
        <button className="navbarButton" onClick={() => setPage("ViewRecipes")}>Back</button>
        <SingleRecipe recipe={recipe} />
      </>
    )
  }
}

export default App