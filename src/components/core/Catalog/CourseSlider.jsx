import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay, FreeMode, Pagination, Navigation} from 'swiper'
import CourseCardCatalog from './CourseCardCatalog'


const CourseSlider = ({Courses}) => {


  return (
   <div>
      {
         Courses?.length ? (
            <Swiper loop={true} 
               slidesPerView={1} 
               spaceBetween={200} 
               modules={[Autoplay, Pagination, Navigation]}
               className='mySwiper max-h-[30rem]' 
               pagination={true}
               onAutoplay={{
                  delay:1000,
                  disableOnInteractions: true,
               }}
            >
               {
                  Courses?.map((course, index) => {
                     <SwiperSlide key={index}>
                        <CourseCardCatalog course={course} height='h-[250px]' />
                     </SwiperSlide>
                  })
               }
            </Swiper>
         ) : (
            <p className="text-xl text-richblack-5">No Course Found</p>
            ) 
      }      
   </div>
  )
}

export default CourseSlider