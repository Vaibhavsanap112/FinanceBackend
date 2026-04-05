import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "../src/pages/Signup"
import Login from "./pages/LoginTemp"
import Dashboard from "../src/pages/Dashboard"
import Record from "../src/pages/Record"
import AddRecord from "../src/pages/AddRecord"
import Users from "./pages/Users";
import './App.css'

function App() {
 

  return (
    <BrowserRouter>

    <Routes>

      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
      <Route path="/records" element={<Record></Record>}></Route>
      <Route path="/add-record" element={<AddRecord></AddRecord>}></Route>
      <Route path="/users" element={<Users />} />
    </Routes>
    
    
    
    </BrowserRouter>
      
  )
}

export default App
