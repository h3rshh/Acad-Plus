import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import {Toast} from 'react-hot-toast'
import { ACCOUNT_TYPE } from 'utils/constants'
import { FaShareSquare } from 'react-icons/fa'

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {

   const {user} = useSelector((state) => state.profile)
   const {token} = useSelector((state) => state.auth)
   const navigate = useNavigate()

   const handleAddToCart = () => {
      if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
         toast.error("You are an Instructor, You Cannot Buy a Course")
         return
      }
      if(token){
         dispatchEvent(addToCart);
         return
      }
      setConfirmationModal({
         text1: "You are Not Logged In",
         text2: "Please Login to Add to Cart",
         btn1text: "Login",
         btn2text: "Cancel",
         btn1Handler: () => navigate("/login"),
         btn2Handler: () => setConfirmationModal(null )
      })
   }

   const handleShare = () => {
      copy(window.location.href)
      toast.success("Link Copied to Clipboard")

   }

   const {
      thubmnail: ThumbnailImage,
      price: CurrentPrice,
   } = course

  return (
   <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`} >

      <img 
         src={ThumbnailImage}
         alt='Thumbnail Image'
         className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
      />

      <div className="px-4">
         <p className="space-x-3 pb-4 text-3xl font-semibold">Rs. {CurrentPrice} </p>
      </div>

      <div className='flex flex-col gap-4'>
         <button className='bg-yellow-50 w-fit text-richblack-900'
            onClick={
            user && course?.studentsEnrolled.includes(user?._id) 
            ? () => navigate("/dashboard/enrolled-courses")
            : handleBuyCourse
         }  >
            {
               user && course?.studentsEnrolled.includes(user?._id) 
               ? "Go To Course":"Buy Course"
            }
         </button>

         {
            (!course?.studentsEnrolled.includes(user?._id) && (
               <button onClick={handleAddToCart}>
                  Add To Cart
               </button>
            ))
         }
      </div>

      <div>

         <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
            30-Day Money-Back Guarantee
         </p>

         <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :</p>

         <div className='flex flex-col gap-x-3 text-caribbeangreen-100'>
            {
               course?.instructions?.map((item, index) => {
                  <p key={index} className='flex gap-2'>
                     <span>{item}</span>
                  </p>
               })
            }
         </div>

      </div>

      <div className='text-center'>
         <button className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
            onClick={handleShare}
         >
            <FaShareSquare size={15} /> Share
         </button>
      </div>

   </div>
  )
}

export default CourseDetailsCard