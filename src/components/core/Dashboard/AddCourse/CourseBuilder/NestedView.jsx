import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiSolidDownArrow } from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
import SubSectionModal from './SubSectionModal'
import { ConfirmationModal } from 'components/common/ConfirmationModal'
import { deleteSection, deleteSubSection } from 'services/operations/courseDetailsAPI'
import { setCourse } from 'slices/courseSlice'

export const NestedView = ({handleChangedSectionName}) => {
  
   const {course} = useSelector( (state) => state.course);
   const {token} = useSelector((state) => state.auth)
   const dispatch = useDispatch();
   

   const [addSubSection, setAddSubSection] = useState(null)
   const [viewSubSection, setViewSubSection] = useState(null)
   const [editSubSection, setEditSubSection] = useState(null)
   const [confirmationModal, setConfirmationModal] = useState(null)

   const handleDeleteSection = async(sectionId) => {
      const result = await deleteSection({
         sectionId,
         courseId: course._id,
         token, 
      })
      if(result){
         dispatch(setCourse(result));
      }
      setConfirmationModal(null) 
   }

   const handleDeleteSubSection = async({subSectionId, sectionId}) => {
      const result = await deleteSubSection({subSectionId, sectionId, token})
      if(result){
         const updatedCourseContent = course.courseContent.map((section) =>
         section._id === sectionId ? result : section);

         const updatedCousrse = {...course, courseContent: updatedCourseContent}
         dispatch(setCourse(result))
      }
      setConfirmationModal(null)
   }

   return (
    <div className=''>
      
      <div className='rounded-lg bg-richblack-700 p-6 px-8'>

         {
            course?.courseContent?.map( (section) => {
               <details key={section._id} open>

                  <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                     <div className="flex items-center gap-x-3">
                        <RxDropdownMenu className="text-2xl text-richblack-50"/>
                        <p className="font-semibold text-richblack-50">
                           {section.sectionName}</p>
                     </div>

                     <div className='flex items-center gap-x-3'>
                        <button onClick={() => handleChangedSectionName(section._id, section.sectionName)}>
                           <MdEdit className="text-xl text-richblack-300" />
                        </button>

                        <button 
                           onClick={() => {
                              setConfirmationModal({
                                 text1: "Delete This Section",
                                 text2: "All the Lectures in this section will be deleted",
                                 btn1Text: "Delete",
                                 btn2Text: "Cancel",
                                 btn1Handler: () => handleDeleteSection(section._id),
                                 btn2Handler: () => setConfirmationModal(null)
                              })
                           }}
                        >
                           <RiDeleteBin6Line className="text-xl text-richblack-300" />
                        </button>

                        <span className="font-medium text-richblack-300">|</span>

                        <BiSolidDownArrow className='text-xl text-richblack-300' />
                     </div>
                  </summary>

                  <div className='px-6 pb-4'>
                     {
                        section.subSection.map( (data) => {
                           <div key={data?.id}
                              onClick={() => setViewSubSection(data)}
                              className='flex items-center justify-between gap-x-3 border-b-2'
                           >
                              <div className="flex items-center gap-x-3 py-2 ">
                                 <RxDropdownMenu className="text-2xl text-richblack-50" />
                                 <p className="font-semibold text-richblack-50">
                                    {data.title}
                                 </p> 
                              </div>

                              <div className='flex items-center gap-x-3'
                                 onClick={(e) => e.stopPropagation()}
                              >
                                 {/* Earlier the view modal was opening unnecessarily even when the
                                 edit or delete were called. This is stopped using stopPropogation
                                 as it prevents view from opening without reason */}
                                 <button onClick={() => setEditSubSection({...data, sectionId: section._id})}>
                                    <MdEdit className="text-xl text-richblack-300" />
                                 </button>

                                 <button 
                                    onClick={() => {
                                       setConfirmationModal({
                                          text1: "Delete This SubSection",
                                          text2: "Selected Lecture will be deleted",
                                          btn1Text: "Delete",
                                          btn2Text: "Cancel",
                                          btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                          btn2Handler: () => setConfirmationModal(null),
                                       })
                                    }}
                                 >
                                     <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                 </button>

                              </div>
                           </div>
                        })
                     }

                     <button className='mt-4 flex items-center gap-x-2 text-yellow-50'
                        onClick={setAddSubSection(section._id)}
                     >
                        <AiOutlinePlus className='text-lg'/>
                        <p>Add Lecture</p>
                     </button>
                  </div>
                  
               </details>
            })
         }
      </div>

      {
         addSubSection ? (<SubSectionModal 
            modalData ={addSubSection}
            setModalData={setAddSubSection}
            add={true}
         />
         ) : 
         (viewSubSection  ? (<SubSectionModal 
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
         />) : 
         editSubSection ? (<SubSectionModal 
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
         />) : 
         (<div></div>))
      }

      {
         confirmationModal ?
         (
            <ConfirmationModal modalData={confirmationModal}/>
         ) :
         (<div></div>)
      }
      

    </div>
  )
}
