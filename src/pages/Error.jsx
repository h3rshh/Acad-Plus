import React from 'react'
import { resetPasswordToken } from 'services/operations/authAPI'

const Error = () => {
  return (
    <div className='flex justify-center items-center text-3xl text-red text-white'>
       Error - 404 Not Found

       <button onClick={resetPasswordToken} className='border-white w-[20rem] h-[8rem]'>
          Send Mail
       </button>
    </div>
  )
}

export default Error
