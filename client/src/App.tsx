import './App.css'
import {useState} from 'react';
import MakeRecipe from './components/MakeRecipe';
import ViewRecipes from './components/ViewRecipes';
//import SignIn from './components/SignIn';


type pages = "ViewRecipes" | "MakeRecipe";

function App() {
  const [page, setPage] = useState('ViewRecipes');
  if (page == "ViewRecipes") {
    return (
      <>
        <button onClick={() => setPage("MakeRecipe")}>New Recipe</button>
        <ViewRecipes/>
      </>
    )
  }
  if (page == "MakeRecipe") {
    return (
      <>
        <button onClick={() => setPage("ViewRecipes")}>Back</button>
        <MakeRecipe/>
      </>
    )
  }  
}

export default App