import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editCourseDetails, fetchCourseCategories } from 'services/operations/courseDetailsAPI'

export const CourseInformationForm = () => {

   const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: {errors},
   } = useForm

   const dispatch = useDispatch();
   const {course, editCourse} = useSelector( (state) => state.course);
   const [loading, setLoading] = useState(false)
   const [courseCategories, setCourseCategories] = useState([])

   useEffect( () => {
      const getCategories = async () => {
         setLoading(true);
         const categories = await fetchCourseCategories();
         if(categories.length > 0){
            setCourseCategories(categories);
         }
         setLoading(false);

         if(editCourse){
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail );
         }

         // getCategories();
      }

      const onSubmit = async (data) => {

      }
   })

  return (
  <form onSubmit={handleSubmit(onSubmit)}>

      <div>
         <label>Course Title<sup>*</sup></label>
         <input
            id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle", {required: true})}
            className='w-full'
         />

         {
            errors.courseTitle && (
               <span>Course Title Is Required</span>
            )
         }
      </div>

      <div>
         <label>Course Short Description<sup>*</sup></label>
         <input
            id='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseTitle", {required: true})}
            className='w-full'
         />

         {
            errors.courseTitle && (
               <span>Course Title Is Required</span>
            )
         }
      </div>
  </form>
  )
}
