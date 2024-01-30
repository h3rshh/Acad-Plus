import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import { NavLink } from 'react-router-dom';
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from '../components/core/HomePage/Button';

const Home = () => {



  return (
    <div>
       {/* Section 1 */}
        <div className='relative max-w-maxContent mx-auto flex flex-col w-11/12 items-center 
        text-white justify-between '>
            <NavLink to="/signup">
                <div className='group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit mt-16 p-1'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </NavLink>

            <div className='text-center text-4xl font-semibold mt-7 '>
                Empower Your Future With {" "}
                <HighLightText text={"Coding Skills"} />
            </div>

            <div className='w-[90%] text-center text-lg font0bold text-richblack-300 mt-4 '>
                With our online coding courses, you can learn at your own pace, from anywhere in the world with our wealth of resources with hands on projects, quizzes, and personalized ffedback from instructors
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"login"}>
                    Book a Demo
                </CTAButton>
            </div>

        </div>
       {/* Section 2 */}

       {/* Section 3 */}

       {/* Section 4 */}
    </div>
  )
}

export default Home
