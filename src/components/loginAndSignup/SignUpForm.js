import React, { useState } from 'react'
import {AiOutlineEye,  AiOutlineEyeInvisible} from "react-icons/ai"
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

const SignUpForm = (props) => {

    const setLoggedIn = props.setLoggedIn;
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState("student");

    const [formData, setFormData] = useState( {
        email: "", password: "", confirmPassword: "",
        firstName: "", lastName: ""
    })

    const [showPassword, setShowPassword] = useState(false );


    function changeHandler(event){

        setFormData( (prevData) => (
            {
            ...prevData,
            [event.target.name] : event.target.value
            }
        )) 
    }

    function submitHandler(event){
        event.preventDefault();
        console.log("Entered SubmitHandler")
        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        setLoggedIn(true);
        toast.success("Account Created")
        const accountData = {
            ...formData
        };
        console.log("Printing Form Data");
        console.log(accountData);

        navigate("/dashboard");
    }

  return (
    <div>

        <div className="flex bg-slate-800 p-1 gap-x-1 rounded-full max-w-max">
            
            <button
                onClick={() => setAccountType("student")}
                className={`${
                    accountType === "student"
                      ? "bg-slate-900 text-slate-5"
                      : "bg-transparent text-slate-200 "
                  } py-2 px-5 rounded-full transition-all`}
                >
                Student
            </button>

            <button  
                onClick={() => setAccountType("instructor")}
                className={`${
                    accountType === "instructor"
                    ? "bg-slate-900 text-slate-5"
                    : "bg-transparent text-slate-200 "
                } py-2 px-5 rounded-full transition-all`}
                >
                Instructor
            </button>
        </div>

        <form onSubmit={submitHandler}
                className="flex flex-col w-full gap-y-4 mt-6" >

            <div className='flex gap-x-5'>
                <label>        
                <p className="text-[0.875rem] text-slate-5 mb-1 leading-[1.375rem]">
                    First Name
                <sup className="text-pink-200">*</sup></p>
                    <input
                        required    type='text' name='firstName' value={formData.firstName}
                        onChange={changeHandler} placeholder='Enter First Name'
                        className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-slate-5" />
                        
                </label>

                <label>
                <p className="text-[0.875rem] text-slate-5 mb-1 leading-[1.375rem]">
                    Last Name
                    <sup className="text-pink-200">*</sup>
                </p>
                    <input
                        required    type='text' name='lastName' value={formData.lastName}
                        onChange={changeHandler} placeholder='Enter Last Name' 
                        className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-slate-5" />
                        
                </label>
            </div>
            


            <label>
            <p className="text-[0.875rem] text-slate-5 mb-1 leading-[1.375rem]">
                Email Address
                <sup className="text-pink-200">*</sup>
            </p>
                <input
                    required    type='email' name='email' value={formData.email}
                    onChange={changeHandler} placeholder='Enter Email Address'
                    className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-slate-5" />
                    
            </label>


            {/* Password */}
            <div className='flex gap-5'>
                <label className="w-full relative">
                    <p className="text-[0.875rem] text-slate-5 mb-1 leading-[1.375rem]">
                        Password
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required    type={ showPassword ? ("text") : ("password")} name='password' value={formData.password}
                        onChange={changeHandler} placeholder='Enter Password'
                        className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-slate-5"
                        />
                    

                    {/* Toggle showPassword */}
                    <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[40px] cursor-pointer " >
                        {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />) }
                    </span>

                </label>

                <label className="w-full relative">
                    <p className="text-[0.875rem] text-slate-5 mb-1 leading-[1.375rem]">
                        Confirm Password
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required    type={ showPassword ? ("text") : ("password")} name='confirmPassword' value={formData.confirmPassword}
                        onChange={changeHandler} placeholder='Confirm Password'
                        className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-slate-5"
                        />
                    

                    {/* Toggle showPassword */}
                    <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[40px] cursor-pointer ">
                        {showPassword ? (<AiOutlineEyeInvisible  fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />) }
                    </span>

                </label>
            </div>
  

            <button className="bg-yellow-400 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-slate-900">
                    Sign in</button>


        </form>

        

    </div>
  )
}

export default SignUpForm
