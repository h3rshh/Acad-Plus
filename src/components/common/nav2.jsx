import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { matchPath } from 'react-router-dom'
import {AiOutlineShoppingCart} from "react-icons/ai"
import {IoIosArrowDropdownCircle} from "react-icons/io"

const Navbar = () => {

  const location = useLocation();

  const [loading, setLoading] = useState(false);

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

  const NavbarLinks = [
   {
     title: "Home",
     path: "/",
   },
   {
     title: "Catalog",
     // path: '/catalog',
   },
   {
     title: "About Us",
     path: "/about",
   },
   {
     title: "Contact Us",
     path: "/contact",
   },
 ];
 
  const token = null;

  
  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
  }

  
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        console.log("Response : ", res);
        console.log("Sublinks : ", subLinks)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700
      ${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>
      
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
                       <div className={`relative flex items-center gap-2 group
                        ${matchRoute("/catalog/catalogName" ? "text-yellow-25" : "text-richblack-25")}`}>
                        
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
                                
                                subLinks.map( (subLink, index) => (
                                  <Link to={`${subLink.link}`} key={index}>
                                    <p>{subLink.name} </p>
                                  </Link>
                                ))
                              
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
            }

            {
              
                <Link to="/login" className='border border-richblack-700 bg-richblack-800 px-[12px]
                  py-[8px] text-richblack-100 rounded-md'>
                  <button>
                    Login
                  </button>
                </Link>
              
            }

           </div>
          

      </div>

    </div>
  )
}

export default Navbar
