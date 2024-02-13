import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import { resetPasswordToken } from '../../server/controllers/ResetPassword';

const ForgotPassword = () => {

   const {emailSent, setEmailSent} = useState(false);
   const  {email, setEmail} = useState("");
   const {loading} = useSelector( (state) => state.auth);
   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(resetPasswordToken) (email, setEmailSent);
   }

  return (
    <div className='text-white flex justify-center items-center'>
       {
         loading ? (<div>Loading ...</div>) : 
         (<div>

            <h1>{!emailSent ? "Reset your Password" : "Check Your Email"}</h1>

            <p>{!emailSent ? "Have no fear. We'll Email you the instructions to reset your password. If you don't have access to your email we can try account recovery" : 
               `We have sent the reset email to ${email}`}
            </p>

            <form onSubmit={handleSubmit}>
               {
                  !emailSent && (
                     <label>
                        <p>Email Address</p>
                        <input required type='email' name='email' value={email}
                           onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email'/>
                     </label>
                  )
               }

               <button type='submit'>
                  {
                     !emailSent ? "Reset Password" : "Resent Email"
                  }
               </button>

            </form>

            <div>
               <Link to="/login">
                  <p>Back To Login</p>
               </Link>
            </div> 

         </div>)
       }
    </div>
  )
}

export default ForgotPassword
