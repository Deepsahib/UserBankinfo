import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import AddAccount from './components/AddAccount';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/navbar" element={<Navbar />} />
     
      <Route path="/add-account" element={<AddAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  )
}

export default App