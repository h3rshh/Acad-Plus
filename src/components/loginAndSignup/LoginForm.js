import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import {Link} from "react-router-dom"
import { toast } from 'react-hot-toast'

const LoginForm = (props) => {

    let setLoggedIn = props.setLoggedIn;
    const navigate = useNavigate();

    const [formData, setFormData] = useState( {
        email: "", password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    function changeHandler(event){

        setFormData( (prevData) => (
            {
            ...prevData,
            [event.target.name] : event.target.value
            }
        ))
    }

    function submitHandler(event){
        console.log("Submit Start")
        event.preventDefault();
        setLoggedIn(true);
        toast.success("Logged In")
        const accountData = {
            ...formData
        };
        console.log("Printing Form Data" )
        console.log(accountData)
        navigate("/dashboard")
    }

  return (
    <form onSubmit={submitHandler}
    className="flex flex-col w-full gap-y-4 mt-6"
    >

        <label className='w-full'> 
        <p className="text-[0.875rem] text-slate-5 mb-1 leading-[1.375rem]">
            Email Address
            <sup className="text-pink-200">*</sup>
        </p>
        <input
            required type='email' value={formData.email} name="email"
            onChange={changeHandler} placeholder='Enter Email ID'
            className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-slate-5" />

        </label>

        <label className="w-full relative">
            <p className="text-[0.875rem] text-slate-5 mb-1 leading-[1.375rem]">
                Password
                <sup className="text-pink-200">*</sup>
            </p>

            <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                placeholder="Enter Password"
                onChange={changeHandler}
                name="password"
                className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-slate-5"
            />
        </label>    

        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] cursor-pointer ">
            {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
        </span>

        <Link to="#">
            <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">Forgot Password</p>
        </Link>

        <button className="bg-yellow-400 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-slate-900">
            Sign in</button>

    </form>
  )
}

export default LoginForm
