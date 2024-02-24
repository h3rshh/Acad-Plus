import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from 'services/operations/profileAPI';

export const EnrolledCourses = () => {

   const {token} = useSelector( (state) => state.auth);

   const [enrolledCourses, setEnrolledCourses] = useState(null);

   const getEnrolledCourses = async () => {
      try{
         const response = await await getUserEnrolledCourses(token);
         setEnrolledCourses(response);
      }
      catch(error){
         console.log("Unable to fetch Enrolled Courses")
      }
   }

   useEffect(()  => {
      getEnrolledCourses()
   },[]);

  return (
    <div className='text-white'>

      <div>Enrolled Courses</div>
      {
         !enrolledCourses ? (
            <div>Loading...</div>
         )
         : !enrolledCourses.length ? (<p>You have not enrolled for any courses</p>)
         : (
            <div>
               <div>
                  <p>Course Name</p>
                  <p>Duration</p>
                  <p>Progress</p>
               </div>

               {/* Cards Begin Here */}
               {
                  enrolledCourses.map( (course, index) => {
                     <div>
                        <div>
                           <img src={course.thumbnail} />
                           <div>
                              <p>{course.courseName}</p>
                              <p>{course.courseDescription}</p>
                           </div>
                        </div>

                        <div>
                           {course?.totalDuration}
                        </div>

                        <div>
                           <p>Progress : {course.progressPercentage || 0}%</p>
                           <ProgressBar 
                              completed={course.progressPercentage || 0}
                              height='8px'
                              isLabelVisible={false}
                           />
                        </div>

                     </div>
                  })
               }
            </div>
         )
      }

    </div>
  )
}
