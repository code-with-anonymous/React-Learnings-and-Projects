import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css'
import CreateUser from './components/createUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CreateUser/>
    </>
  )
}

export default App
