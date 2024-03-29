import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay, FreeMode, Navigation, Pagination} from 'swiper'
import ReactStars from 'react-rating-stars-component'
import { apiConnector } from 'services/apiConnector'
import { ratingsEndpoints } from 'services/apis'

const ReviewSliderHome = () => {

   const [reviews, setReviews] = useState([]);
   const truncateWords = 15;

   useEffect(() => {
      const fetchAllReviews = async () => {
         const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
         console.log("Response of Fetch Reviews : ", response)

         const {data} = response;
         if(data?.success){
            setReviews(data?.data);
         }

         console.log("Printing Reviews : ", )
      }
   }, [])

  return (
      <div>
         
      </div>
  )
}

export default ReviewSliderHome