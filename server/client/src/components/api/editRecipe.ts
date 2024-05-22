import { API_URL } from "./config";

export async function editRecipe(name: string) {
    const res = await fetch(`${API_URL}/put`, {
      method: 'PUT',
      body: JSON.stringify({name: name}),
      headers: { // headers let us tell a lot of things
      'Content-Type': 'application/json', //this tells what we're passing thru
    }})

    return res.json();
}