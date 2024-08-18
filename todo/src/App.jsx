import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header'
import Todo from './components/todos/Todo'

function App() {

  return (
    <main>
      <Header/>
      <Todo/>
    </main>
  )
}

export default App
