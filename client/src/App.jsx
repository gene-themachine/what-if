import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeView from './pages/HomeView'
import Layout from './components/Layout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'


function App() {

  
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />



      </Route>
    
    </Routes>
  )
}

export default App
