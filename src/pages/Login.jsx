import React from 'react'
import login from "../assets/Images/login/login.png"
import Template from '../components/loginAndSignup/Template' 

function Login(props) {
  const setLoggedIn = props.setLoggedIn; 

  return (
    <div>
      <Template
        title="Welcome Back"
        desc1="Build Skills Today, Tomorrow and Beyond"
        desc2="Education to Future-Proff your Career"
        image={login}
        formType="login"
        
      />  
    </div>
    
  )
}

export default Login
