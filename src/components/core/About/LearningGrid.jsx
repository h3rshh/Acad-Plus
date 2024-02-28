import React from "react";
import HighlightText from "../HomePage/HighLightText";
import CTAButton from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "AcadZenith partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "AcadZenith partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "AcadZenith partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "AcadZenith partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "AcadZenith partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12 text-white">
      {LearningGridArray.map((card, index) => {
        return (
         <div key={index} 
            className={` p-5 h-[270px]
            
            ${index === 0 && "lg:col-span-2 lg:h-[300px]"}
            
            ${card.order % 2 === 1 ? "bg-richblack-700 lg:h-[300px]" : "bg-richblack-800 lg:h-[300px]"}

            ${card.order === 3 && 'lg: col-start-2'}

            ${card.order < 0 && "bg-transparent"}
         `}>

            {
               card.order < 0 ? 
               (<div className="lg:w-[90%] flex flex-col pb-5 gap-3">
                  <div className="text-4xl font-semibold"> 
                     {card.heading}
                     <HighlightText text={card.highlightText} />
                  </div>

                  <p className="font-medium">
                     {card.description}
                  </p>

                  <CTAButton active={true} linkto={card.BtnLink}
                    className="w-fit  mt-4">
                      {card.BtnText}
                    </CTAButton>
               </div>)

               : (
               <div className="flex flex-col gap-8 p-7">
                <h1 className="text-richBlack-5 text-lg"
                >{card.heading}</h1>

                <p className="text-richBlack-300 font-medium"
                >{card.description}</p>   
               </div>)
            }
            
         </div>  
        ) 
      })}
    </div>
  );
};

export default LearningGrid;