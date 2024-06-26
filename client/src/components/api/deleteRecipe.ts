import { API_URL } from "./config";

export async function deleteRecipe(removeName: string) {
    fetch (`${API_URL}/delete`, {
      method: 'DELETE',
      body: JSON.stringify({name: removeName}),
      headers: {
      'Content-Type': 'application/json',
    }});
}