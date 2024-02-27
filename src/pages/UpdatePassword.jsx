import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import CTAButton from 'components/core/HomePage/Button';
import {Link} from "react-router-dom"
import { resetPassword } from 'services/operations/authAPI';
import { FaArrowLeftLong } from 'react-icons/fa6';

export const UpdatePassword = () => {

   const dispatch = useDispatch();
   const location = useLocation();
   
   const [formData, setFormData] = useState({
      password: "",
      confirmPassword: ""
   })

   const {loading} = useSelector( (state) => state.auth);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const {password, confirmPassword} = formData;

   

   const handlePasswordChange = (e) => {
      setFormData( (prevData) => (
         {
            ...prevData,
            [e.target.name] : e.target.value
         }
      ))
   }

   const handleSubmit = (e) => {
      console.log("Submit Button Pressed")
      e.preventDefault();
      const token = location.pathname.split("/").at(-1);
      console.log("Token : ", token
      
       )
      dispatch(resetPassword(password, confirmPassword, token)); 
   }

  return (
    <div className='bg-white'>

       {
         loading ? (
            <div>
               Loading....
            </div>
         ) : (
            <div>
               <h1>Choose New Password</h1>

               <p>Almost done. Enter your new password and you're all set.</p>

               <form onSubmit={handleSubmit}>

                  <label>

                     <p>New Password</p>
                     <input 
                        required
                        type={showPassword ? "text": "password"}
                        name='password'
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder='Enter New Password'
                        className='w-full p-6 bg-richblack-600 text-richblack-5'
                     />

                     <span onClick={ () => setShowPassword((prev) => !prev)}>
                        {
                           showPassword ? <AiFillEyeInvisible className='' fontSize={24} /> : <AiFillEye fontSize={24} /> 
                        }   
                     </span>

                  </label>

                  <label>

                     <p>Confirm Password</p>
                     <input 
                        required
                        type={showConfirmPassword ? "text": "password"}
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder='Confirm Password'
                        className='w-full p-6 bg-richblack-600 text-richblack-5'
                     />

                     <span onClick={ () => setShowConfirmPassword((prev) => !prev)}>
                        {
                           showPassword ? 
                           <AiFillEyeInvisible fontSize={24} /> 
                           : <AiFillEye fontSize={24} /> 
                        }   
                     </span>
                     
                  </label>

                  <button type='submit' className='w-[15rem] h-[5rem] text-white bg-richblack-900 border-white'>
                        Reset Button
                  </button>

                  <Link>
                     <CTAButton type="submit">
                        Reset Password
                     </CTAButton>
                  </Link>

               </form>

               <div>
                  <Link to="/login" className='flex mt-4 items-center hover:cursor-pointer text-richblack-100  '>
                     <FaArrowLeftLong className='mr-2'/>
                     <p>Back To Login</p>
                  </Link>
               </div> 

            </div>
         )
       }

    </div>
  )
}
