import React from 'react'
import { resetPasswordToken } from 'services/operations/authAPI'
import { useDispatch } from 'react-redux'

const Error = () => {

  const dispatch = useDispatch();

  const clickHandler = (e) => {
    try{
      console.log("Click handler called")
      e.preventDefault();
      // Need email and setEmailSent
      dispatch(resetPasswordToken);
      console.log("Dispatch Completed")
    }
    catch(error){
      console.log("Error : ", error)
    }
  }

  return (
    <div className='flex justify-center items-center text-3xl text-red text-white'>
       Error - 404 Not Found

       <button onClick={clickHandler} className='border-white w-[20rem] h-[8rem]'>
          Send Mail
       </button>
    </div>
  )
}

export default Error
