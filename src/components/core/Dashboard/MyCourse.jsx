import { IconButton } from 'components/common/IconButton';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from 'services/operations/courseDetailsAPI';
import { CoursesTable } from './InstructorCourses/CoursesTable';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export const MyCourse = () => {

   const {token} = useSelector((state) => state.auth);
   const navigate = useNavigate();
   const [courses, setCourses] = useState([])

   useEffect( () => {
      const fetchCourses = async () => {
         const result = await fetchInstructorCourses(token);
         if(result){
            setCourses(result)
         }
      }
      fetchCourses()
   }, [])

  return (

    <div className='text-white'>
      
      <div className='flex justify-between'>

         <h1>My Courses</h1>
         <IconButton 
            text="Add Course"
            onClick={() => navigate('dashboard/add-course')}
            // TODO add icon here
         />

      </div>

      {
         courses && <CoursesTable courses={courses} setCourses={setCourses} />
      }

    </div>
  )
}
