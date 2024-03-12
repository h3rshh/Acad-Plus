import { IconButton } from 'components/common/IconButton';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiAddToQueue } from 'react-icons/bi'
import { BiRightArrow } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { createSection, updateSection } from 'services/operations/courseDetailsAPI';
import { setLoading } from 'slices/authSlice';
import { setCourse, setEditCourse } from 'slices/courseSlice';
import NestedView from './NestedView'

export const CourseBuilderForm = () => {

   const {register, handleSubmit, setValue, formState: {errors}} = useForm();
   const [editSectionName, setEditSectionName] = useState(null);
   const dispatch = useDispatch();

   const cancelEdit = () => {
      setEditSectionName(null);
      setValue("sectionName", "");
   }

   const goBack = () => {
      dispatch(setStep(1));
      dispatch(setEditCourse(true))
   }

   const handleChangedSectionName = (sectionId, sectionName) => {

      if(editSectionName === sectionId ){
         cancelEdit();
         return ;
      }

      setEditSectionName(sectionId);
      setValue("sectionName", sectionName)
   }

   const goToNext = () => {

      if(course.courseContent.length === 0){
         toast.error("Please add atleast One Section")
         return;
      }
      if(course.courseContent.some( (section) => section.subSection.length === 0)){
         toast.error("Please Add Atleast One Lecture")
         return;
      }

      // When Everything is fine, proceed
      dispatch(setStep(3))
   }

   const handleFormSubmit = async (data) => {
      setLoading(true);
      let result;

      if(editSectionName){
         result = await updateSection(
            {
               sectionName: data.sectionName,
               sectionId: editSectionName,
               courseId: course._id
            }, token
         )
      }
      else{
         result = await createSection({
            sectionName: data.sectionName,
            courseId: course._id
         }, token)
      }

      // Update Values
      if(result){
         dispatch(setCourse(result));
         setEditSectionName(null);
         setValue("sectionName", "")
      }

      setLoading(false)
   }

  return (
    <div className='text-white'>

      <p>Course Builder</p>

      <form className='' onSubmit={handleFormSubmit}>

         <div>
            <label>Section Name <sup>*</sup></label>
            <input 
               id='sectionName'
               placeholder='Add Section Name'
               {...register('sectionName', {required:true})}
            />

            {errors.sectionName && (
               <span className=''
               >Section Name is Required </span>
            )}

         </div>

         <div className='mt-10 flex flex-row'>
            <IconButton type='submit' 
               text={editSectionName ? "Edit Section Name" : "Create Section"} outline={true}
            >
               <BiAddToQueue className='text-yellow-50' size={20}/>
            </IconButton>

            {editSectionName && (
               <button type='button' onClick={cancelEdit}
               className='text-sm text-richblack-300 underline'>
                  Cancel Edit
               </button>
            )}
         </div>

         

      </form>

      {
         course.courseContent.length > 0 && (
            <NestedView handleChangedSectionName={handleChangedSectionName} />
         )
      }

      <div className='flex justify-end gap-x-3'>
         <button onClick={goBack} className='rounded-md cursor-pointer flex items-center'>
            Back
         </button>

         <IconButton text="Next" onClick={goToNext}>

         </IconButton>
      </div>

    </div>
  )
}
