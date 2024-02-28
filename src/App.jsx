import React from 'react'
import Home from "./pages/Home"
import {Routes, Route, useNavigate} from "react-router-dom";
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { UpdatePassword } from 'pages/UpdatePassword';
import Error from 'pages/Error';
import { VerifyEmail } from 'pages/VerifyEmail';
import { About } from 'pages/About';
import { MyProfile } from 'components/core/Dashboard/MyProfile';
import { OpenRoute } from 'components/core/Auth/OpenRoute';
import { PrivateRoute } from 'components/core/Auth/PrivateRoute';
import { Dashboard } from 'pages/Dashboard';
import { EnrolledCourses } from 'components/core/Dashboard/EnrolledCourses';
import Cart from 'components/core/Dashboard/Cart';
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = false;
  const ACCOUNT_TYPE = false;
  const AddCourse = false;

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>

      <Navbar/>

      <Routes>

         <Route path='/' element={<OpenRoute><Home/></OpenRoute>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/login' element={<OpenRoute><Login/></OpenRoute>} />
         <Route path='/forgot-password' element={<ForgotPassword/>}/>
         <Route path='/update-password/:id' element={<UpdatePassword/>}/>
         <Route path='/verify-email' element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
         <Route path='about' element={<About/>}/>

         <Route path='/about' element={<About/>}/>
         <Route path='about' element={<About/>}/>
         <Route path='dashboard/my-profile' element={<MyProfile/>} />
        
         {/* <Route element={<PrivateRoute><Dashboard/></PrivateRoute>} /> */}
         {/* <Route path='dashboard/Settings' element={<Settings/>} />  */}
         <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>} />
         <Route path='dashboard/cart' element={<Cart/>} />

         {/* <Route path='' element={<PrivateRoute><Dashboard/></PrivateRoute>} /> */}
         <Route path='*' element={<OpenRoute><Error/></OpenRoute>} />

         {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path='dashboard/cart' element={<Cart />}/>
              <Route path='dashboard/enrolled-courses' element={<EnrolledCourses />}/>
            </>
          )
         }

{
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path='dashboard/add-course' element={<AddCourse />}/>
              {/* <Route path='dashboard/enrolled-courses' element={<EnrolledCourses />}/> */}
            </>
          )
         }
         

      </Routes>
      
    </div>
  )
}

export default App
