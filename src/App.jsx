import React from 'react'
import Home from "./pages/Home"
import {Routes, Route} from "react-router-dom";
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { UpdatePassword } from 'pages/UpdatePassword';
import Error from 'pages/Error';

const App = () => {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>

      <Navbar/>

      <Routes>

         <Route path='/' element={<Home/>} />
         <Route path='signup' element={<Signup/>} />
         <Route path='login' element={<Login/>} />
         <Route path='forgot-password' element={<ForgotPassword/>}/>
         <Route path='update-password' element={<UpdatePassword/>}/>
         <Route path='error' element={<Error/>} />

      </Routes>
      
    </div>
  )
}

export default App
