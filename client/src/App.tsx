import './App.css'
import {MouseEventHandler, useState} from 'react';
import MakeRecipe from './components/MakeRecipe';
import ViewRecipes from './components/ViewRecipes';
import { handleLoginAPI } from './components/api/handleLoginAPI';
//import SignIn from './components/SignIn';

type pages = "ViewRecipes" | "MakeRecipe" | "SignIn"; 
function App() {
  const [page, setPage] = useState<pages>("SignIn");
  const [password, setPassword] = useState("");  

  function returnToViewRecipe() {
    setPage("ViewRecipes");
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
          <label>Password:</label>
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
        <ViewRecipes/>
      </>
    )
  }
  if (page == "MakeRecipe") {
    return (
      <>
        <button className="navbarButton" onClick={() => setPage("ViewRecipes")}>Back</button>
        <MakeRecipe returnToViewRecipe={returnToViewRecipe}/>
      </>
    )
  }  
}

export default App