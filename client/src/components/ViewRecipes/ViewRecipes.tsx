import './ViewRecipes.css';
import {useState, useEffect} from 'react';
import { deleteRecipe } from '../api/deleteRecipe';
//import { editRecipe } from '../api/editRecipe';
import { TRecipe, getRecipes } from '../api/getRecipes';

interface CallBack {
  (): void;
}

interface CallBackWithInput {
  (recipe: TRecipe): void;
}

interface ViewRecipesProps {
  viewSingleRecipe: CallBackWithInput;
  returnToViewRecipe: CallBack;
}

function ViewRecipes(props: ViewRecipesProps) {
    // Array destructuring!
    // stateValue, dispatcher
  const [allRecipes, setRecipes] = useState<TRecipe []>([]);
  //const [addName, setName] = useState('');

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
  *//*
  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    // optimistic update
    const recipe = await editRecipe(addName);
    setRecipes([...allRecipes, recipe]);
    setName('');

  }*/


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

  const handleClickRecipe = (recipe: TRecipe) => {
    props.viewSingleRecipe(recipe)
  }
  const renderRecipes = () : JSX.Element => {
    const displayRecipes: JSX.Element[] = [];
    for (let i: number = 0; i < allRecipes.length; i++) {
        const recipe = allRecipes[i];
        displayRecipes.push(
        <li key={i}>
          <button className="delete-button" onClick={() => {if (confirm("Are you sure?")){handleDelete(recipe.name);}}}>x</button>
          <button onClick={() => handleClickRecipe(recipe)}>{recipe.name}</button>
        </li>
        );
    }
    return (
    
        <ul className="recipes">
          {displayRecipes}
        </ul>
    )
}



  return (
    <>

        {renderRecipes()}

    </>
  )
  
  }

export default ViewRecipes