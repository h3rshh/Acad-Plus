import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from 'react-icons/gi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ReactStars from 'react-rating-stars-component'


export const RenderCartCourses = () => {

   const {cart} = useSelector((state) => state.cart)
   const dispatch = useDispatch();

  return (
    <div>

    {
      cart.map( (course, index) => {
         <div key={index}>
            <div>

               <img src={course?.thumbnail} />

               <div>
                  <p>{course?.courseName}</p>
                  <p>{course?.categoru?.name}</p>

                  <div>
                     4.8

                     <ReactStars
                        count={5}
                        size={20}
                        edit={false}
                        activeColor='#ffd700'
                        emptyIcon={<GiNinjaStar/>}
                        fullIcon={<GiNinjaStar/>}
                     />   

                     <span>{course?.ratingAndReviews?.length}</span>

                  </div>
               </div>
            </div>

            {/* <div onClick={() => dispatch(removeFromCart(course._id))}> */}
            <div >

               <button>
                  <RiDeleteBin6Line/>
                  <span>Remove</span>
               </button>

               <p>Rs {course?.price}</p>
            </div>

         </div>
      })
    }  

    </div>
  )
}
