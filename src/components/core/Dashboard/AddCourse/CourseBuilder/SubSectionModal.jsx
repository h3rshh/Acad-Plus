import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from 'services/operations/courseDetailsAPI';
import { setCourse } from 'slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import { IconButton } from 'components/common/IconButton';
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import Upload from "../Upload"

export const SubSectionModal = ({
   modalData,
   setModalData,
   add = false,
   view = false,
   edit = false
}) => {

   const {register, handleSubmit, setValue, formState: {errors}, getValues} = useForm();
   const [loading, setLoading] = useState(false);
   const {course} = useSelector((state) => state.course);
   const {token} = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   useEffect( () => {
      if(view || edit){
         setValue("lectureTitle", modalData.title);
         setValue("lectureDesc", modalData.description);
         setValue("lectureVideo", modalData.videoUrl);
      }
   },[]);

   const isFormUpdated = () => {
      const currentValues = getValues();
      if(currentValues.lectureTitle !== modalData.title ||
         currentValues.lectureDesc !== modalData.description ||
         currentValues.lectureVideo !== modalData.videoUrl){
            return true
      }
      else{
         return false
      }

   }

   const onSubmit = async() => {
      if(view){
         return;
      }
      if(edit){
         if(!isFormUpdated){
            toast.error("No Changes Made to the Form")
         }
         else{
            handleEditSubSection();
         }
      }

      const formData = new FormData();
      formData.append("sectionId", modalData)
      formData.append("title", data.lectureTitle);
      formData.append("description", data.lectureDesc);
      formData.append("video", data.lectureVideo);
      setLoading(true)

      const result = await createSubSection(formData, token)

      if(result){
         const updatedCourseContent = course.courseContent.map((section) =>
         section._id === sectionId ? result : section);

         const updatedCousrse = {...course, courseContent: updatedCourseContent}
         dispatch(setCourse(result))
      }
      setModalData(null);
      setLoading(false);
   }


   const handleEditSubSection = async() => {
      const currentValues = getValues();
      const formData = new FormData();
      formData.append("sectionId", modalData.sectionId);
      formData.append("subSectionId", modalData._id);

      if(currentValues.lectureTitle !== modalData.title){
         formData.append("title", currentValues.lectureTitle)
      }
      if(currentValues.lectureDesc !== modalData.description){
         formData.append("description", currentValues.lectureDesc)
      }
      if(currentValues.lectureVideo !== modalData.videoUrl){
         formData.append("video", currentValues.lectureVideo)
      }

      setLoading(true);
      const result = await updateSubSection(formData, token);
      if(result){
         const updatedCourseContent = course.courseContent.map((section) =>
         section._id === modalData.sectionId ? result : section);

         const updatedCousrse = {...course, courseContent: updatedCourseContent}
         dispatch(setCourse(result));
      }
      setModalData(null);
      setLoading(false )
   }

  return (
   <div className=''>

      <div className=''>

         <div className=''>

            <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
            <button onClick={() => (!loading ? setModalData(null): (<div></div>))}>
               <RxCross1 />
            </button>

         </div>

         <form onSubmit={handleSubmit(onSubmit)}>

            <Upload 
               name="lectureVideo"
               label="Lecture Video"
               register={register}
               setValue={setValue}
               errors={errors}
               video={true}
               viewData={view ? modalData.videoUrl: null}
               editData={edit ? modalData.videoUrl: null }
            />

            <div>
               <label>Lecture Title</label>
               <input 
                  id='lectureTitle'
                  placeholder='Enter Lecture Title'
                  {...register("lectureTitle", {required: true})}
                  className='w-full'
               />
               {
                  errors.lectureTitle && (<span>
                     Lecture Title Is Required
                  </span>)
               }
            </div>

            <div>
               <label>Lecture Description</label>
               <textarea 
                  id='lectureDesc'
                  placeholder='Enter Lecture Desciption'
                  {...register("lectureDesc", {required: true})}
                  className='w-full min-h-[130px]'
               />
               {
                  errors.lectureDesc && (<span>
                     Lecture Description Is Required
                  </span>)
               }
            </div>

            {
               !view && (
                  <div>
                     <IconButton
                        text={loading ? "Loading..." : " "}
                     />
                  </div>
               )
            }

         </form>

      </div>

   </div>
  )
}