import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editCourseDetails, fetchCourseCategories } from 'services/operations/courseDetailsAPI'
import { RequirementField } from './RequirementField'
import { IconButton } from 'components/common/IconButton'
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

         getCategories();
      }
   })

   const isFormUpdated = () => {
      const currentValues = getValues();
      if(currentValues.courseTitle !== course.courseName ||
         currentValues.courseShortDesc !== course.courseDescription ||
         currentValues.coursePrice !== course.price ||
         currentValues.courseBenefits !== course.whatYouWillLearn ||
         currentValues.courseCategory !== course.category ||
         currentValues.courseTitle !== course.instructions ||
         currentValues.courseTitle !== course.courseName ){
         return true
      }
      else{
         return false
      }
   }

   // Handles Next button
   const onSubmit = async (data) => {

      if(editCourse) {
         
         if(isFormUpdated){

            const currentValues = getValues();
            const formData = new FormData();

            formData.append("courseId", course._id);

            if(currentValues.courseTitle !== course.courseName){
               formData.append("courseName", data.courseTitle)
            }
            
            if(currentValues.courseShortDesc !== course.courseDescription){
               formData.append("courseDescription", data.courseShortDesc)
            }
            
            if(currentValues.coursePrice !== course.price){
               formData.append("price", data.coursePrice)
            }
            
            if(currentValues.courseBenefits !== course.whatYouWillLearn){
               formData.append("whatYouWillLearn", data.courseBenefits)
            
            if(currentValues.courseCategory._id !== course.category._id){
               formData.append("category", data.courseCategory)
            }
            
            if(currentValues.courseRequirements.toString() !== course.instructions.toString()  ){
               formData.append("instructions", JSON.stringify(data.courseRequirements))
            }

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            setLoading(false);
            if(result){
               setStep(2);
               dispatch(setCourse(result));
            }
         }
      }

      else{
         toast.error("No changes made so far ")
      }
      return
   }

  return (
  <form onSubmit={handleSubmit(onSubmit)}>

      <div>
         <label htmlFor='courseTitle'>Course Title<sup>*</sup></label>
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
         <label htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
         <input
            id='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseTitle", {required: true})}
            className='w-full'
         />

         {
            errors.courseTitle && (
               <span>Course Description Is Required</span>
            )
         }
      </div>

      <div className='relative'>
         <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
         <input
            id='coursePrice'
            placeholder='Enter Price'
            {...register("courseTitle", {required: true})}
            className='w-full'
         />
         <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400' />
         {
            errors.coursePrice && (
               <span>Course Price Is Required **</span>
            )
         }
      </div>

      <div>
         <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>

         <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required: true})}
         >
            <option value="" disabled >Choose Category</option>

            {
               !loading && courseCategories.map((category, index) => (
                  <option key={index} value={category?._id}>
                     {category?.name}
                  </option>
               ))
            }
         </select>
      </div>

      {/* Create a custon component for handling Tags Input */}
      {/* <ChipInput
         label="Tags"
         name="courseTags"
         placeholder="Enter tags and press enter"
         register={register}
         errors={errors}
         setValue={setValue}
         getValues={getValues}
      />    */}

      {/* Create a component for uploading and showing preview of media */}

      {/* <UploadMedia
         name=
         label=
         register={}
         errors=
         setValue={}
      /> */}

      {/* Benefits of the course */}
      <div>
         <label>Benefits of the course</label>
         <textarea
            id='courseBenefits'
            placeholder='Benefits of the course'
            {...register("courseBenefits", {required:true})}
            className='min-h-[130px] w-full'
         />
         {
            errors.courseBenefits && (
               <span>
                  Benefits of the course are required
               </span>
            )
         }

      </div>   

      <RequirementField
         name='courseRequirements'
         label='Requirements/Instructions'
         errors={errors}
         setValue={setValue}
         getValues={getValues}
         register={register}
      />    

      <div>
         {
            editCourse && (
               <button 
                  className='flex items-center gap-x-2 bg-richblack-300'
                  onClick={() => dispatch(setStep(2))}
               >
                  Continue Without Saving
               </button>
            )
         }

         <IconButton
           text={!editCourse ? "Next" : "Save Changes"}
         />
      </div>

  </form>
  )
}
