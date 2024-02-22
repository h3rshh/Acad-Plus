import login from "../assets/Images/login/login.png"
import Template from '../components/loginAndSignup/Template' 

function Login() {

  return (
    <div>
      <Template
        title="Welcome Back"
        description1="Build Skills Today, Tomorrow and Beyond"
        description2="Education to Future-Proff your Career"
        image={login}
        formType="login"
        
      />  
    </div>
    
  )
}

export default Login
