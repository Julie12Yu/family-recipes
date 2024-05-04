import { API_URL } from "./config";

// callback function type - lets us tell us what type of function we'll pass in
interface CallBackFunc {
  (): void;
}

export async function handleLoginAPI(password: string, returnToViewRecipe: CallBackFunc) {
  const handleLoginResponse = (res: Response) => {
    if (res.status == 200) {
      // lets us run the function we passed in
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

