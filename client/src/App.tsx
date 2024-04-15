import './App.css'

function App() {
  async function handleButtonClick() {
    const requestData = {
      // Your request payload
      name: "hehhehaw",
      ingredients: "hungry",
    };
    fetch ('http://localhost:8000/post', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
      'Content-Type': 'application/json',
    },
  })
}

  return (
    <>
      <button onClick={() => handleButtonClick()}>Add recipe to database</button>
    </>
  )
  
}

export default App
