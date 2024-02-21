import React from 'react'
import signupImg from "../assets/signup.png"
import Template from '../components/Template' 


const SignUp = (props) => {
  let setLoggedIn = props.setLoggedIn;
  return (
    <div>
      <Template
        title="Welcome Back"
        desc1="Build Skills Today, Tomorrow and Beyond"
        desc2="Education to Future-Proff your Career"
        image={signupImg}
        formType="signup"
        setLoggedIn={setLoggedIn}
      />  
    </div>
  )
}

export default SignUp
