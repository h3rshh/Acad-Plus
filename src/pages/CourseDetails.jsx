import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from 'services/operations/courseDetailsAPI';
import { buyCourse } from 'services/operations/studentFeaturesAPI';
import GetAvgRating from 'utils/avgRating';
import Error from './Error';
import { ConfirmationModal } from 'components/common/ConfirmationModal';
import RatingStars from 'components/common/RatingStars';
import formatDate from '../services'

const CourseDetails = () => {

   const {user} = useSelector((state) => state.profile);
   const {token} = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {courseId} = useParams();
   const {loading} = useSelector((state) => state.profile);
   const {paymentLoading} = useSelector((state) => state.course);
   const [confirmationModal, setConfirmationModal] = useState(null)

   const [courseData, setCourseData] = useState(null);
   const [isActive, setIsActive] = useState(Array(0));

   const handleActive = (id) => {
      setIsActive(
         !isActive.includes(id) 
         ? isActive.concat(id)
         : (isActive.filter((e) => e != id))
      )
   }

   useEffect( async() => {
      const getCourseFullDetaile = async() =>{
         try{
            const result = await fetchCourseDetails(courseId)
         }
         catch(error){
            console.log("Error : ", error)
         }
      }
   }, [courseId]);

   
   const [avgReviewCount, setAvgReviewCount] = useState(0);

   useEffect( () => {
      const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
      setAvgReviewCount(count)
   }, [courseData])

   const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
   useEffect( () => {
      let lectures = 0;
      courseData?.data?.CourseDetails?.courseContent?.forEach((sec) => {
         lectures += sec.subSection.length || 0
      })
   })

   const handleBuyCourse = () => {
      if(token){
         buyCourse(token, [courseId], user, navigate, dispatch);
         return;
      }
   }

   if(loading || !courseData){
      return (
         <div>Loading...</div>
      )
   }
   if(!courseData.success){
      return (
         <div><Error /></div>
      )
   }

   const {
      _id: course_id,
      courseName,
      courseDescription,
      thumbnail,
      price,
      whatYouWillLearn,
      courseContent,
      ratingAndReviews,
      instructor,
      studentsEnrolled,
      createdAt,
   } = courseData.data?.CourseDetails;

  return (
   <div className='flex flex-col items-center'>

      <div className='relative flex justify-center'>
         <p>{courseName}</p>
         <p>{courseDescription}</p>
         <div>
            <span>{avgReviewCount}</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
            <span>{`(${ratingAndReviews.length} Reviews)`}</span>
            <span>{`(${studentsEnrolled.length} Students Enrolled)`}</span>
         </div>

         <div>
            <p>Created By {`${instructor.firstName}`} {" "} {`${instructor.lastName}`}</p>
         </div>

         <div className='flex gap-x-3'>
            <p>Created At {formatDate(createdAt)}</p>
            <p>{" "} English</p>
         </div>

         <div>
            <CourseDetailsCard 
               course={courseData?.data?.courseDetails}
               setConfirmationModal={setConfirmationModal}
               handleBuyCourse={handleBuyCourse}
            />
         </div>

      </div>

      <div>
         <p>What You Will Learn</p>
         <div>{whatYouWillLearn}</div>
      </div>

      <div>

         <div>
            <p>Course Content:</p>
         </div>


         <div className='flex gap-x-3 justify-center'>

            <div>
               <span>{courseContent.length} section</span>
               
               <span>{totalNoOfLectures} Lectures</span>

               <span>{courseData.data?.totalNoOfLectures} Total Length</span>         
            </div>

            <div>
               <button onClick={() => setIsActive([])}>
                  Collapse All Sections
               </button>
            </div>
            
         </div>

      </div>
      
      
      <div>
         
         {
            confirmationModal && <ConfirmationModal modalData={confirmationModal} />
         }
      </div>

   </div>
  )
}

export default CourseDetails