import React from 'react'
import { useSelector } from 'react-redux'

export const RenderSteps = () => {

   const {step} = useSelector()

   const steps = [
      {
         id: 1,
         title: "Course Information"
      },
      {
         id: 2,
         title: "Course Builder"
      },
      {
         id: 3,
         title: "Publish"
      }
   ]

  return (
    <div>



    </div>
  )
}
