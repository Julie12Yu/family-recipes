import './App.css'

function App() {
  async function handlePost() {
    const requestData = {
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
      <button onClick={() => handlePost()}>Add recipe to database</button>
      <button onClick={() => handleDelete()}>Delete 'eeee' recipe :D</button>
    </>
  )
  
  }

export default App