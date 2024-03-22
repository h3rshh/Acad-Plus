import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
    <NavLink >
        <div className={`text-center text-[14px] px-6 py-3 rounded-md font-bold
            ${active ? "bg-yellow-50 text-black": "bg-richblack-800"}
            hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </NavLink>
  )
}

export default Button
