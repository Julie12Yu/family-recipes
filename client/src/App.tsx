import './App.css'
import {useState} from 'react';
import MakeRecipe from './components/MakeRecipe';

function App() {
  const [name, setName] = useState('');

  return (
    <>
      <MakeRecipe/>
    </>
  )
  
  }

export default App