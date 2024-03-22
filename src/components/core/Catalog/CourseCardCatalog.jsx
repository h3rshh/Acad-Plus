import RatingStars from 'components/common/RatingStars'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from 'utils/avgRating';

const CourseCardCatalog = ({course, height}) => {

   const [avgReviewCount, setAvgReviewCount] = useState(0);

   useEffect(() => {
      const count = GetAvgRating(course.ratingAndReviews);
      setAvgReviewCount(count);
   }, [course])

  return (
    <div className=''>

      <Link to={`/courses/${course._id}`}>
         <div>
            <div>
               <img 
                  src={course?.thumbnail}
                  alt="Course Thumbnail"
                  className={`${height} w-full rounded-xl object-cover`}
               />
            </div>

            <div>
               <p>{course?.courseName}</p>
               <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
               <div>
                  <span>{avgReviewCount || 0}</span>
                  <RatingStars Review_Count={avgReviewCount} />
                  <span>{course?.ratingAndReviews.length} Ratings</span>

               </div>
               <p>{course?.price}</p>

            </div>

         </div>
      </Link>
    </div>
  )
}

export default CourseCardCatalog