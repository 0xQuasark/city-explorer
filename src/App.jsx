import React from 'react'
import './App.css'
import axios from 'axios';

// Vites way of loading files from a .env file -> requires "VITE_" to be used at the beginning of your key
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;


function App() {

  return (
    <>
      <h1>Vite + React</h1>
      {console.log(API_KEY)}
    </>
  )
}

export default App
