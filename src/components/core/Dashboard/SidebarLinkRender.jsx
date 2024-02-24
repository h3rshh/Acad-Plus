import React from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath } from 'react-router-dom';
// import { resetCourseState}

export const SidebarLinkRender = ({link, iconName}) => {
  
      const Icon = Icons[iconName];
      const location = useLocation();
      const dispatch = useDispatch();

      const matchRoute = (route) => {
         return matchPath({path:route}, location.pathname)
      }
  
   return (
    <div className='text-white'>

      <NavLink to={link.path} className={`relative px-8 py-2 text-sm font-medium
         ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}`}>
         
         <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
            ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
            
         </span>

         <div className='flex items-center gap-x-2'>
            <Icon className="text-lg"/>
            <span>{link.name}</span>
         </div>
         
      </NavLink>

    </div>
  )
}
