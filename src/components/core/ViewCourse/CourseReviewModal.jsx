import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { IconButton } from 'components/common/IconButton'
import { createRating } from 'services/operations/courseDetailsAPI'

const CourseReviewModel = ({setReviewModal}) => {

   const {user} = useSelector((state) => state.profile)
   const {token} = useSelector((state) => state.auth)
   const {courseEntireData} = useSelector((state) => state.viewCourse)

   const {
      register,
      handleSubmit,
      setValue,
      formState: {errors}
   } = useForm()

   useEffect(() => {
      setValue("courseExperience", "");
      setValue("courseRating", "0")
   }, [])

   const ratingChanged = (newRating) => {
      setValue("courseRating", newRating)
   }

   const onSubmit = async (data) => {
      createRating(
         {
            courseId: courseEntireData._id,
            rating: data.corurseRating,
            review: data.courseExperience
         }
      )
   }


  return (
      <div className=''>
         
         {/* Modal Header */}
         <div className=''>
            <p>Add Review</p>
            <button
               onClick={setReviewModal(false)}
            >
               Close
            </button>
         </div>

         {/* Modal Body */}
         <div className=''>

            <div>

               <img 
                  src={user?.image}
                  alt='User Image'
                  className='aspect-square w-[50px] rounded-full objet-cover'
               />

               <p>{user?.firstName} {user?.lastName}</p>
               <p>Posting Publicly</p>


            </div>
         </div>

         <form onSubmit={handleSubmit(onSubmit)}
            className='mt-6 flex flex-col items-center'
         >
            
            <ReactStars 
               count={5}
               size={24}
               onChange={ratingChanged}
               activeColor="#ffd700"
            />

            <div>

               <label htmlFor='courseExpericence'>
                  Add Your Experience
               </label>

               <textarea 
                  id='courseExperience'
                  placeholder='Add Your Expreience Here'
                  {...register("courseExperience", {required: true})}
                  className='form-style min-h-[130px] w-full'
               />
               {
                  errors.courseExperience && (
                     <span>
                        Please Add Your Experience
                     </span>
                  )
               }
            </div>

            {/* Cancel and Save Button */}
            <div>
               <button onClick={setReviewModal(false)}>
                  Cancel
               </button>

               <IconButton 
                  
               />
            </div>


         </form>

      </div>
  )
}

export default CourseReviewModel