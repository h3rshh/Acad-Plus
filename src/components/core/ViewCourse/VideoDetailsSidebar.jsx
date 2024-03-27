import { IconButton } from 'components/common/IconButton';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const VideoDetailsSidebar = ({setReviewModal}) => {

   const [activeStatus, setActiveStatus] = useState("");
   const [videoBarActive, setVideoBarActive] = useState("");
   const navigate = useNavigate();
   const location = useLocation();
   const {sectionId, subSectionId} = useParams();
   const {
      courseSectionData,
      courseEntireData,
      totalNoOfLectures,
      completedLectures,
   } = useSelector((state) => state.viewCourse);

   useEffect(() => {
      const setActiveFlags = () => {
         if(!courseSectionData.length){
            return
         }
         // Finding index of current section
         const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
         )
         // Finding index of current subsection
         const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.
         findIndex(
            (data) => data._id === subSectionId
         )
         const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.
         [currentSubSectionIndex]?._id;

         // Set Current section and subsection
         setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
         setVideoBarActive(activeSubSectionId);
      }
      setActiveFlags();
   }, [courseSectionData, courseEntireData, location.pathname])

  return (
   <div className=''>
      
      <div>

         {/* For buttons and headings */}
         <div>

            {/* For Buttons */}
            <div>

               <div
                  onClick={() => {navigate("/dashboard/enrolled-courses")}}
               >
                  Back
               </div>

               <div>
                  <IconButton 
                     text='Add Review'
                     onClick={() => setReviewModal(true)}
                  />
               </div>

            </div>

            {/* For Heading or Title */}
            <div className=''> 
               <p>{courseEntireData?.courseName}</p>
               <p>{completedLectures?.length} / {totalNoOfLectures}</p>
            </div>

         </div>

         {/* For sections and Subsections */}
         <div className=''>
            {
               courseSectionData.map((course, index) => {
                  <div 
                     onClick={() => setActiveStatus(course?._id)}
                     key={index}
                  >
                     
                     
                     <div>

                     </div>
                  </div>
               })
            }
         </div>

      </div>
   
   
   </div>
  )
}

export default VideoDetailsSidebar