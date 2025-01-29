import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeView from './pages/HomeView'
import Layout from './components/Layout'
import PostView from './pages/PostView'

function App() {

  
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<HomeView />} />
        <Route path="/post/:id" element={<PostView />} /> 
      </Route>
    </Routes>
  )
}

export default App
