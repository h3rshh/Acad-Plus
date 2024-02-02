import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

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

  return (
    <div>

        <div className='text-4xl font-semibold text-center'>
            Unlock the {" "}
            <HighLightText text={"Power Of Code"} />
        </div>

        <p className='text-center text-richblack-300 text-[16px] mt-3'>
            Learn To Build Anything You Can Imagine
        </p>

        <div className='flex flex-row rounded-full bg-richblack-800 mb-2 border-richblack-100
        px-1 py-1'>
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

        <div className=''>

        </div>

        {/* Course Card Group */}
        <div className='absolute flex flex-row gap-10 justify-between w-full'>
            {
                courses.map( (element, index) => {
                    return(
                        <CourseCard 
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        />
                    )
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore
