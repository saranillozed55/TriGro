import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MyStock from './components/MyStock'

import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/api/hello')
    .then(res => res.json()) // raw response object and reads the body and parses it
    .then(data => setMessage(data.message)) // now data is actual parsed JavaScript object
    .catch(err => console.error(err))
  }, [])


  return (
    <>
      <main className ="ml-64">
        <div>{message || 'Loading...'}</div>
        <MyStock/>
      </main>
      <Sidebar/>
   </> 
  )
}

export default App
