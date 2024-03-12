import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const NestedView = () => {
  
   const {course} = useSelector( (state) => state.course);
   const {token} = useSelector((state) => state.auth)
   const dispatch = useDispatch();

   const [addSubSection, setAddSubSection] = useState(null)
   const [viewSubSection, setViewSubSection] = useState(null)
   const [editSubSection, setEditSubSection] = useState(null)
   const [confirmationModal, setConfirmModal] = useState(null)

   return (
    <div className=''>
      
      {
         course?.courseContent?.map( (section) => {
            <details key={section._id} open>

               <summary>
                  
               </summary>
            </details>
         })
      }

    </div>
  )
}
