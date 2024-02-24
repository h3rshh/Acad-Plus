import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from 'react-router-dom'
import { Sidebar } from 'components/core/Dashboard/Sidebar'

export const Dashboard = () => {

   const {loading: authLoading} = useSelector( (state) => state.auth);
   const {loading: profileLoading} = useSelector( (state) => state.profile);
   const {user} = useSelector((state) => state.profile)

   if(user === null) {
      return(
         <div>
            User is Null
         </div>
      )
   }

   if(authLoading || profileLoading){
      return(
         <div className='mt-[10rem] text-4xl'>
            Loading
         </div>
      )
   }

  return (
   <div className='relative flex min-h-[calc(100vh-2.5rem)] text-white'>

      <Sidebar/>

      <div className='min-h-[calc(100vh-2.5rem)] overflow-auto'>

         <div className='mx-auto w-11/12 max-w-[1000px] py-18'>
            <Outlet/>
         </div>

      </div>
      
   </div>
  )
}
