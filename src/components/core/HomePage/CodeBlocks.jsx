import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import HighLightText from './HighLightText';
import CTAButton from './Button';
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock,
backgroundGradient, codeColor1, codeColor2, blurColor}) => {

  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
        
        {/* Section 1 */}
        <div className='w-[50%] flex flex-col gap-8'>
            {heading}

            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                    <div className='flex gap-2 items-center'>
                         {ctabtn1.btnText}
                         <FaArrowRight />
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >
                    <div className='flex gap-2 items-center'>
                         {ctabtn2.btnText}
                    </div>
                </CTAButton>
            </div>
        </div>


        {/* Section 2 */}
        <div className='h-fit relative flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px]  bg-richblack-900 shadow-x-4 shadow-[-5px_-6px_5px_rgba(121,22,87,0.3),4px_10px_15px_#F37290] '>

            {/* BackGround Gradient HW */}

            <div className={`absolute w-[10rem] h-[10rem] rounded-full bg-${blurColor} left-[22%] blur-3xl`}>

            </div>
            

            <div className='text-center text-[14px] flex flex-col w-[10%] text-richblack-400
                font-inter font-bold '>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] flex text-[14px] flex-col gap-2 font-bold font-mono ${codeColor2} pr-2`}>
                <TypeAnimation 
                    sequence={[codeblock, 3000, ""]}
                    cursor= {true}
                    repeat={Infinity} 
                    omitDeletionAnimation={true}
                    style ={{
                        whiteSpace: "pre-line",
                        display: ""
                    }}
                    />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks
