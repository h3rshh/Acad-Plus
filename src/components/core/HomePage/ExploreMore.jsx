import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const tabsName = [
    "Free", "New to Coding", "Most Popular", "Skill Paths", "Career Paths"
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter( (course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    console.log("Courses : ", courses);

  return (
    <div>

        <div className='text-4xl font-semibold text-center'>
            Unlock the {" "}
            <HighLightText text={"Power Of Code"} />
        </div>

        <p className='text-center text-richblack-300 text-[16px] mt-3'>
            Learn To Build Anything You Can Imagine
        </p>

        <div className='flex flex-row rounded-full bg-richblack-800 mb-4 border-richblack-100
        px-1 py-1 w-fit mx-auto'>
            {
                tabsName.map( (element, index) => {
                    return(
                        <div key={index} className={`text-[16px] flex flex-row items-center rounded-full 
                            transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2
                            ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium"
                            : "text-richblack-200"}`}
                            onClick={() => setMyCards(element)}>
                                {element}
                        </div>
                    )
                })
            }
        </div>

        {/* <div className=''>

        </div> */}

        {/* Course Card Group */}
        <div className='grid grid-cols-3 gap-16 justify-center w-full items-center mb-10'>
            
            {
                courses.map( (element, index) => {
                    return (
                        <div key={index} className='relative mt-10'>

                            <div className='relative z-40 flex w-[310px] h-[310px] items-start text-richblue-900
                            flex-col  bg-white px-5'>
                            
                                <div className='text-richblack-700 font-semibold text-2xl mt-4'> 
                                    {element.heading}
                                </div>
                                
                                <div className='mt-4'>
                                    {element.description}
                                </div>

                                <div className='absolute top-[75%] mx-auto w-[88%] h-[1px] bg-richblack-50'></div>
                                
                                <div className='flex justify-between absolute top-[82%]'>
                                    
                                    <div className='flex flex-row items-center mr-14'>   
                                        <HiUsers/>
                                        <div className='ml-2'>{element.level}</div>
                                    </div>

                                    <div className='relativeflex flex-row items-center '>
                                        <ImTree className='absolute left-[58%]'/>
                                        <div className='ml-2 '>{element.lessionNumber} Lessons</div>
                                    </div>
                                </div>
                            </div> 

                            <div className='z-20 absolute w-[310px] h-[310px] bg-yellow-50 top-[4%] right-[-4%]'>
                            </div>
                        </div>
                          
                    )
                    // return(
                    //     <CourseCard 
                    //     key={index}
                    //     cardData={element}
                    //     currentCard={currentCard}
                    //     setCurrentCard={setCurrentCard}
                    //     />
                    // )
                    
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore
