import React from 'react'
import frameImage from "../../assets/Images/login/frame.png"
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { FcGoogle } from "react-icons/fc";


function Template({title, desc1, desc2, image, formType, setLoggedIn}) {
  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto gap-y-0 gap-x-12 justify-between">
    
      
    <div className="w-11/12 max-w-[450px] mx-0 text-white">
    <h1 className="text-slate-5 font-semibold text-[1.875rem] leading-[2.375rem]">{title}</h1>

        <p className="text-[1.125rem] mt-4 leading-[1.625rem]">
          <span className="text-slate-100">{desc1}</span>
          <span className="text-blue-100 italic">{desc2}</span>
        </p>

        {formType === "signup" ? 
            (<SignUpForm setLoggedIn={setLoggedIn} />) :
            (<LoginForm setLoggedIn={setLoggedIn}/>)
        }

        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="h-[1px] w-full bg-slate-700"></div>
          <p className="text-slate-700 font-medium leading-[1.375rem]">OR</p>
          <div className="h-[1px] w-full bg-slate-700"></div>
        </div>  

        <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-richblack-100 border-richblack-700 border px-[12px] py-[8px] gap-x-2 mt-6">
          <FcGoogle />
          <p>Sign Up with Google</p>
        </button>

      </div>

      <div className="relative w-11/12 max-w-[450px]">
        <img src={frameImage}
            alt='Pattern' width={558} height={504}
            loading='lazy'/>
        
        <img src={image}
            alt='Pattern' width={558} height={504}
            loading='lazy'
            className="absolute -top-4 right-4 "
        />
      </div>
    </div>
  )
}

export default Template
