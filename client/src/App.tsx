import './App.css'
import {MouseEventHandler, useState} from 'react';
import MakeRecipe from './components/MakeRecipe';
import ViewRecipes from './components/ViewRecipes';
//import SignIn from './components/SignIn';

// preps type for callback function that allows us to swap page back, without abusing the 'button' usage that auto refreshes
interface CallBack {
  (): void;
}


type pages = "ViewRecipes" | "MakeRecipe" | "SignIn"; 
function App() {
  const [page, setPage] = useState("SignIn");
  const [password, setPassword] = useState("");

  

  function returnToViewRecipe() {
    setPage("ViewRecipes");
  }

  const handleLogin : MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify({password: password}),
      headers: { // headers let us tell a lot of things
      'Content-Type': 'application/json', //this tells what we're passing thru
    }}).then(handleLoginResponse)
    .catch((e) => {console.log(e.message)})
  }

  const handleLoginResponse = (res: Response) => {
    if (res.status == 200) {
      setPage("ViewRecipes");
    } else {
      alert("Incorrect Password")
    }
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