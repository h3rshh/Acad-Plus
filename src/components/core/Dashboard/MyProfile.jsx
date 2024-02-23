import { IconButton } from 'components/common/IconButton'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const MyProfile = () => {

   const {user} = useSelector( (state) => state.profile)
   const navigate = useNavigate();

  return (
    <div>

      <h1>My Profile</h1>

      {/* Section 1 */}
      <div>
         <div>

            <img
               src={`${user?.image}`}
               alt={`profile-${user?.firstName}`}
               className='aspect-square w-[70px] rounded-full object-cover'/>

            <div>
               <p>{user?.firstName + " " + user?.lastName}</p>
               <p>{user?.email}</p>
            </div>

            <IconButton
               text="Edit"
               onClick={() => {
                  navigate("/dashboard/settings")
               }}
            />

         </div>
      </div>

    </div>
  )
}
