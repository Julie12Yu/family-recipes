import './MakeRecipe.css'
import {useState} from 'react';

function MakeRecipe() {
  const [name, setName] = useState('');

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
    </>
  )
  
  }

export default MakeRecipe