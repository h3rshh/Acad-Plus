import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import { resetPasswordToken } from 'services/operations/authAPI'
import CTAButton from 'components/core/HomePage/Button'
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgotPassword = () => {

   const [emailSent, setEmailSent] = useState(false);
   const  [email, setEmail] = useState("");
   const {loading} = useSelector( (state) => state.auth);
   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Handle Submit Entered")
      dispatch(resetPasswordToken(email, setEmailSent));
   }

  return (
    <div className=' text-white flex justify-center items-center h-full'>
      <div className=' w-[28%] mt-[10%]'>
         {
            loading ? (<div>Loading ...</div>) : 
            (<div className=''>

               <h1 className='text-4xl mb-3'
               >{!emailSent ? "Reset your Password" : "Check Your Email"}</h1>

               <p className='text-richblack-100 text-lg mb-8'
               >{!emailSent ? "Have no fear. We'll Email you the instructions to reset your password. If you don't have access to your email we can try account recovery" : 
                  `We have sent the reset email to ${email}`}
               </p>

               <form className='flex flex-col' >
                  {
                     !emailSent && (
                        <label>
                           <p className='text-richblack-100 mb-1'
                           >Email Address</p>

                           <input required 
                              type='email' 
                              name='email' 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)} 
                              placeholder='Enter Your Email'
                              className='w-full mb-4 text-richblack-100
                              text-center text-[13px] px-6 py-3 rounded-md font-bold
                              bg-richblack-800
                              hover:scale-95 transition-all duration-200'
                              />
                        </label>
                        
                     )
                  }

                  <button onClick={handleSubmit} className='border w-[10rem] h-[3rem]'>
                     Reset Password
                  </button>
                  <CTAButton onClick={handleSubmit} active={1} >
                     {
                        !emailSent ? "Reset Password" : "Resent Email"
                     }
                  </CTAButton>

               </form>

               <div>
                  <Link to="/login" className='flex mt-4 items-center hover:cursor-pointer text-richblack-100  '>
                     <FaArrowLeftLong className='mr-2'/>
                     <p>Back To Login</p>
                  </Link>
               </div> 

            </div>)
         }
      </div>   
    </div>
  )
}

export default ForgotPassword
