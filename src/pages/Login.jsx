import React from 'react'
import Template from '../components/Template'
import loginImg from "../assets/login.png"

function Login(props) {
  const setLoggedIn = props.setLoggedIn; 

  return (
    <div>
      <Template
        title="Welcome Back"
        desc1="Build Skills Today, Tomorrow and Beyond"
        desc2="Education to Future-Proff your Career"
        image={loginImg}
        formType="login"
        setLoggedIn={setLoggedIn}
        
      />  
    </div>
    
  )
}

export default Login
