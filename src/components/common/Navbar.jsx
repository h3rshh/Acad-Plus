import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from "../../data/navbar-links"
import { matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle} from "react-icons/io"

const Navbar = () => {

  const subLinks = [
    {
      title: "python",
      link: "/catalog/python"
    },
    {
      title: "web dev",
      link: "/catalog/web-development"
    }
  ]

  const token = null;

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
  }

  // const {token} = useSelector( (state) => state.auth)
  const {user} = useSelector( (state) => state.profile)
  const {totalItems} = useSelector( (state) => state.cart)
  // const {subLinks, setSubLinks} = useState([]);

  const fetchSubLinks = async() => {
    try{
      const result = await apiConnector("GET", categories.CATEGORIES_URL);
      console.log("Pringting Sublings result : ", result)
      // setSubLinks(result.data.data)
    }
    catch(error){
      console.log("Could Not Fetch the category List")
    }
  }

  useEffect( () => {
    // fetchSubLinks();
  }, [])

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      
      <div className='flex w-11/12 max-w-maxContent justify-between items-center'>
         {/* Image */}
         <Link to="/">
           <img src={logo} width={160} height={42} loading='lazy' />
         </Link>


         {/* Nav Links */}
         <nav>
           
           <ul className='flex gap-x-6 text-richblack-25' >
           {
              NavbarLinks.map( (link, index) => {
                return <li key={index}>
                    {
                       link.title === "Catalog" ? (
                       <div className='relative flex items-center gap-2 group'>
                          <p>{link.title}</p>
                          <IoIosArrowDropdownCircle />

                          <div className='invisible absolute left-[50%] top-[50%]
                            translate-x-[-50%] translate-y-[65%] p-4
                            flex flex-col rounded-md bg-richblack-5 text-richblack-900
                            opacity-0 transition-all duration-200 group-hover:visible 
                            group-hover:opacity-100 lg:w-[300px]'>

                            <div className='absolute left-[50%] top-0 translate-s-[80%]
                              translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>

                            </div>

                            {
                              subLinks.length ? (
                                
                                subLinks.map( (subLink, index) => {
                                  <Link to={`${subLink.link}`} key={index}>
                                    <p>{subLink.title} </p>
                                  </Link>
                                })
                              
                              ) : (<div>Nothing available in catalog</div>)  
                            }

                          </div>
                       </div>
                       ) : (
                          <Link to={link?.path}>
                             <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                {link.title}
                             </p>
                          </Link>
                       )
                    }
                </li>
              })
           }
           </ul>
         </nav>


          {/* Login / Signup / Dashboard */}

           <div className='flex gap-x-4 items-center'>

            {
             user && user?.accountType !== "Instructor" && (
                <Link to="/dashboard/cart" className='relative'>
                  <AiOutlineShoppingCart />
                  {
                     totalItems > 0 && (
                      <span>
                        {totalItems}
                      </span>
                     )
                  }
                </Link>
             ) 
            }

            {
              token === null && (
                <Link to="/login" className='border border-richblack-700 bg-richblack-800 px-[12px]
                  py-[8px] text-richblack-100 rounded-md'>
                  <button>
                    Login
                  </button>
                </Link>
              )
            }

            {
              token === null && (
                <Link to="/signup" className='border border-richblack-700 bg-richblack-800 px-[12px]
                py-[8px] text-richblack-100 rounded-md'>
                  <button>
                    Sign Up
                  </button>
                </Link>
              )
            }

            {
              token !== null && <ProfileDropDown />
            }

           </div>
          

      </div>

    </div>
  )
}

export default Navbar
