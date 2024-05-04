import { API_URL } from "./config";

interface CallBackFunc {
  (): void;
}

export async function handleLoginAPI(password: string, returnToViewRecipe: CallBackFunc) {
  const handleLoginResponse = (res: Response) => {
    if (res.status == 200) {
        returnToViewRecipe();
    } else {
        alert("Incorrect Password")
    }
  }

  await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({password: password}),
        headers: {
        'Content-Type': 'application/json',
      }}).then(handleLoginResponse)
    .catch((e) => {console.log(e.message)})

    
}

