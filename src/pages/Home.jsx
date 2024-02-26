import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import { NavLink } from 'react-router-dom';
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import "../App.css"
import Footer from '../components/common/Footer';
import LearningLanguage from "../components/core/HomePage/LearningLanguage";
import Timeline from "../components/core/HomePage/Timeline"
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';

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

            <div className='shadow-blue-200 mx-3 my-12'>
                {/* <video  
                muted
                loop
                autoPlay>
                    <source src={Banner} type='video/mp4' />
                </video> */}
                <div className='bg-richblack-600 w-[62rem] h-[35rem]'></div>
            </div>

            { /* Code Sub Section 2 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                    <div>
                        Unlock Your
                        <HighLightText text={"Coding Potential"} />
                        with our Online Courses
                    </div>}
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with You"}
                    ctabtn1={{
                        btnText: "Try it yourself",
                        linkto: "/signup",
                        active: true,
                    }}
                    ctabtn2={{
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }}
                    codeColor1={"text-yellow-25"}
                    codeColor2={"white"}
                    blurColor={"yellow-50"}
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/seven">seven</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>

            { /* Code Sub Section 3 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                    <div>
                        Unlock Your
                        <HighLightText text={"Coding Potential"} />
                        with our Online Courses
                    </div>}
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with You"}
                    ctabtn1={{
                        btnText: "Try it yourself",
                        linkto: "/signup",
                        active: true,
                    }}
                    ctabtn2={{
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }}
                    codeColor1={"text-yellow-25"}
                    codeColor2={"white"}
                    blurColor={"richblue-100"}
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/seven">seven</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>

            {/* Explore More Section */}
            <ExploreMore />

        </div>    

       {/* Section 2 */}
       <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[333px]'>
                
                <div className='w-11/12 max-w-maxContent flex flex-col items-center
                gap-5 mx-auto justify-center'>

                    <div className='h-[250px]'></div>

                    <div  className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                <p>Explore Full Catalog</p>
                                <FaArrowRight />
                            </div>                            
                        </CTAButton>
                        
                        <CTAButton active={false} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                <p>Learn More</p>
                            </div>                            
                        </CTAButton>

                    </div>
                </div>
            </div>

            <div className='mx-auto max-w-11/12 max-w-maxContent flex flex-col items-center justify-between'>
                
                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>

                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the skills you need for a {" "}
                        <HighLightText text={"Job that is in Demand "}/>    
                    </div>


                    <div className='flex flex-col gap-10 w-[40%] items-start '>
                        <p className='text-[16px]'>The modern Acad Zenith dictates it's own terms. Today, to be a
                            competitive specialist, you need more than professional skills</p>

                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More     
                        </CTAButton>
                    </div>

                </div>

                <Timeline />

                <LearningLanguage />

            </div>

       </div>

        {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-cneter justify-between gap-8'>
            
            <InstructorSection />

            <h2 className='text-center text-4xl font-semibold mt-10'>Reviews From Other Learners`</h2>
             
        </div>   

        
        {/* Section 4 */}
        <Footer />         

    </div>
  )
}

export default Home
