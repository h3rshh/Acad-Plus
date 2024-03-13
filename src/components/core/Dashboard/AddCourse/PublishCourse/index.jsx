import { IconButton } from 'components/common/IconButton';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editCourseDetails } from 'services/operations/courseDetailsAPI';
import { resetCourseState } from 'slices/courseSlice';
import { COURSE_STATUS } from 'utils/constants';


export const index = () => {

   const {register, handleSubmit, setValue, getValues} = useForm();
   const {course} = useSelector((state) => state.course );
   const dispatch = useDispatch();
   const {token} = useSelector((state) => state.auth)
   const [loading, setLoading] = useState(false);


   const goBack = () => {
      dispatch(setStep(2))
   }

   const goToCourses = () => {
      dispatch(resetCourseState());

   }

   const handleCoursePublish = async() => {
      if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true 
      || course.status === COURSE_STATUS.DRAFT && getValues("public") === false){
         // No need for updation
         goToCourses();
         return
      }

      // If form is updated
      const formData = new FormData();
      formData.append("courseId", course._id);
      const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
      formData.append("status", courseStatus);

      setLoading(true);
      const result = await editCourseDetails(formData, token);

      if(result){
         goToCourses();
      }
      setLoading(false);
   }

   const onSubmit = () => {

   }

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>
      
      <p>Publish Course</p>

      <form onSubmit={handleSubmit(onSubmit)}>

         <div>
            <label htmlFor='public'>
               <input 
                  type='checkbox'
                  id='public'
                  {...register("public")}
                  className='rounded h-4 w-4'
               />

               <span className='ml-3'>
                  Make this Course Public
               </span>
            </label>
         </div>

         <div className='flex justify-end gap-x-3'>
            <button
               disabled={loading}
               type='button'
               onClick={goBack}
               className='flex items-center rounded-md bg-richblack-300 p-6'
            >
               Back
            </button>
            <IconButton disabled={loading} text="Save Changes" />
         </div>

      </form>

    </div>
  )
}
