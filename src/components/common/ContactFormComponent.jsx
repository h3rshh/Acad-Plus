import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { apiConnector } from 'services/apiConnector';
import { contactusEndpoint } from 'services/apis';
import CountryCode from "../../data/countrycode.json"

export const ContactFormComponent = () => {

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful}
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data : ", data)
    try{
      setLoading(true);
      const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      // const response = {status: "OK"};
      console.log("Logging Response : ", response);
      setLoading(false)
    } 
    catch(error){
      console.log("Error : ", error.message);
      setLoading(false);
    }
  }

  useEffect( () => {
     if(isSubmitSuccessful){
      reset({
        email: "",
        firstName: "",
        lastName: "",
        phoneNum: "",
      })
     }
  }, [reset, isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className='flex flex-col text-black'>

        <div className='flex flex-col gap-14'>

          <div className="flex flex-col gap-5 lg:flex-row">            {/* First Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">              <label htmlFor='firstName' className='label-style'>First Name</label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                className='form-style'
                placeholder='Enter First Name'
                {...register("firstName", {required: true})}
              />  
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">              <label className='label-style' htmlFor='lastName'>First Name</label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                className='form-style'
                placeholder='Enter Last Name'
                {...register("lastName")}
              />  
              {errors.firstname && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your name.
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">            
          <label htmlFor='email' className='label-style'>Email Address</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter Email Address'
              className='form-style'
              {...register("email", {required: true})}
              />
              {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Email address.
                </span>
              )}
          </div>

          {/* Phone Number */}
          <div className='flex flex-col gap-10 '>

            <label htmlFor='phoneNumber' className='label-style'>Phone Number</label>

            <div className='flex flex-row gap-5'>

              {/* Dropdown */}
              <div className="flex w-[81px] flex-col gap-2">                <select
                  name='dropdown'
                  id='dropdown'
                  className="form-style"
                  {...register("countryCode", {required: true})}
                >
                  
                  {
                    CountryCode.map( (element, index) => {
                      return (
                        <option key={index} value={element.code}>
                          {element.code} -{element.country}
                        </option>
                      )
                    })
                  }

                </select>
              </div>

              {/* Phone Number */}
              <div className="flex w-[calc(100%-90px)] flex-col gap-2">                <input
                  type='number'
                  name='phoneNumber'
                  id='phoneNumber'
                  className='form-style'
                  placeholder='12345 67890'
                  {...register("phoneNumber", {
                    required: {value: true , message: "Please Enter Phone Number"},
                    maxLength: {value: 10, message:"Invalid Phone Number"},
                    minLength: {value: 8, message: "Invalid Phone Number"} })
                  }
                />
              </div>
            </div>
            {errors.phoneNo && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.phoneNo.message}
              </span>
            )}
          </div> 

          {/* Message */}
          <div className="flex flex-col gap-2">            
            <label htmlFor='message' className='label-style'>Your Message</label>
             <textarea 
              name='message'
              id='message'
              cols="30"
              rows="7"
              className='form-style'
              placeholder='Enter Your Message Here'
              {...register("message", {required: true})}
            />
          </div>

        </div>

        {/* <button
          disabled={loading}
          type='submit'
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
          ${
            !loading &&
            "transition-all duration-200 hover:scale-95 hover:shadow-none"
          }  disabled:bg-richblack-500 sm:text-[16px] `}
        >
          Send Message
        </button> */}


        <button type='submit' className='w-[16rem] h-[3.5rem] bg-yellow-25'>
          Submit
        </button>

      </div>
    </form>
  )
}
