import React from 'react'
// import { useState } from 'react'
import logo from '../assets/Logo.svg'
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"

function Navbar(props) {

    let loggedIn = props.loggedIn;
    let setLoggedIn = props.setLoggedIn;

  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <Link to="/" >
        <img src={logo} alt='Logo' width={160} 
        height={32} loading='lazy' /> 
      </Link>

      <nav>
      <ul className="flex gap-x-6 text-slate-100">
            <li>
                <Link to="/">Home</Link>
            </li>

            <li>
                <Link to="/">About</Link>
            </li>

            <li>
                <Link to="/">Contact</Link>
            </li>
        </ul>
      </nav>


      <div className="flex items-center gap-x-4 text-slate-100">

        { !loggedIn &&
            <Link to="/login">
            <button className="bg-slate-800 py-[8px] px-[12px] rounded-[8px] border border-slate-700">
                    Log In
                </button>
            </Link>
        }  

        { !loggedIn &&
            <Link to="/signup">
            <button className="bg-slate-800 py-[8px] px-[12px] rounded-[8px] border border-slate-700">
                    Sign Up
                </button>
            </Link>
        }  

        { loggedIn &&
            <Link to="/">
                <button className="bg-slate-800 py-[8px] px-[12px] rounded-[8px] border border-slate-700" 
                    onClick={() => {
                    setLoggedIn(false);  
                    toast.success()
                }}>
                    Log Out
                </button>
            </Link>
        }  

        { loggedIn &&
            <Link to="/dashboard">
                <button className="bg-slate-800 py-[8px] px-[12px] rounded-[8px] border border-slate-700">
                    Dashboard
                </button>
            </Link>
        }  
      </div>  
    </div>
  )
}

export default Navbar
