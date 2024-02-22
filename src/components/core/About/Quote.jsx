import React from 'react'
import HighLightText from '../HomePage/HighLightText'

export const Quote = () => {
  return (
    <div className='text-white'>
      We are passionate bout our revolutionising the way we learn. Our innovative
      platform <HighLightText text={"combines technology"} />

      <span className='text-brown-500'>
         {" "}
         expertise
      </span>

      , and community to create an

      <span>
         unparalleled educational experience 
      </span>
    </div>
  )
}
