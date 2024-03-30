import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay, FreeMode, Navigation, Pagination} from 'swiper'
import ReactStars from 'react-rating-stars-component'
import { apiConnector } from 'services/apiConnector'
import { ratingsEndpoints } from 'services/apis'
import { FaStar } from 'react-icons/fa'


const ReviewSliderHome = () => {

   const dummyRatingAndReview = ({
      user: "60f7b26739e1ff001b9612d2", // User ID
      rating: 5,
      review: "Excellent service!"
    });

   const [reviews, setReviews] = useState([dummyRatingAndReview]);
   const truncateWords = 15;

   // let reviews = {

   // }

   useEffect(() => {
      const fetchAllReviews = async () => {
         const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
         console.log("Response of Fetch Reviews : ", response)

         const {data} = response;
         if(data?.success){
            setReviews(data?.data);
            console.log("Fetch Success")
         }

         console.log("Printing Reviews : ", reviews)
      }
      fetchAllReviews();
   }, [])

  return (
      <div className='text-white'>

         <div className='h-[190px] max-w-maxContent'>
            <Swiper
               slidesPerView={4}
               spaceBetween={24}
               loop={true}
               freeMode={true}
               autoplay={{
                  delay: 2500,
               }}
               modules={[FreeMode, Pagination, Autoplay]}
               className='w-full'
            >
               {
                  reviews !== undefined && reviews !== null && reviews.map((review, index) => (
                     <SwiperSlide key={index}>
                        <img 
                           src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                           alt='Profile Pic'
                           className='h-9 w-9 object-cover rounded-full'
                        />
                        
                        <p>{review?.user?.firstName} {review?.user?.lastName}</p>

                        <p>{review?.course?.courseName}</p>

                        <p>{review?.review}</p>

                        <p>{review?.rating.toFixed(1)}</p>

                        <ReactStars 
                           count={5}
                           size={20}
                           edit={false}
                           value={review.rating}
                           emptyIcon={<FaStar />}
                           fullIcon={<FaStar />}
                           activeColor="#ffd700"
                        />

                     </SwiperSlide>
                  ))
               }
            </Swiper>
         </div>
         
      </div>
  )
}

export default ReviewSliderHome