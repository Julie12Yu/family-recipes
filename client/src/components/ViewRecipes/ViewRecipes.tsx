import './ViewRecipes.css';
import {useState, useEffect} from 'react';
import { deleteRecipe } from '../api/deleteRecipe';
import { TRecipe, getRecipes } from '../api/getRecipes';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

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

  const renderRecipesBetter = () : JSX.Element => {
    const displayRecipes: JSX.Element[] = [];
    for (let i: number = 0; i < allRecipes.length; i++) {
      const recipe = allRecipes[i];
      displayRecipes.push(
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <CardActionArea onClick={() => handleClickRecipe(recipe)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '16px', marginBottom: '0px' }}>
                {recipe.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ mt: 'auto', justifyContent: 'space-between', paddingTop: '0px'}}>
            <Button size="small" color="primary" onClick={() => {if (confirm("Are you sure?")){handleDelete(recipe.name);}}}>
              Delete
            </Button>
            <Button size="small" color="primary" onClick={() => handleClickRecipe(recipe)}>
              Share
            </Button>
          </CardActions>
        </Card>
      )
    }
    return (
      <ul className="recipes">
        {displayRecipes}
      </ul>
    )
  }



  return (
    <>
        {renderRecipesBetter()}
    </>
  )
  
  }

export default ViewRecipes