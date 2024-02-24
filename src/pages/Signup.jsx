import React from 'react'
import signupImg from "../assets/Images/login/signup.png"
import Template from '../components/loginAndSignup/Template'
// import { signUp } from 'services/operations/authAPI'

const SignUp = () => {

 

  return (
    <div>
      <Template
        title="Welcome Back"
        desc1="Build Skills Today, Tomorrow and Beyond"
        desc2="Education to Future-Proff your Career"
        image={signupImg}
        formType="signup"
      />  
    </div>
  )
}

export default SignUp
