import React from 'react'

const HighLightText = ({text}) => {
  return (
    <span className='font-bold text-blue-100' >
  {/* <span className='font-bold text-richblue-200 bg-gradient-to-r from-richblue-600 to-richblue-900'> */}
        
       {" "} {text} {" "}
    </span>
  )
}

export default HighLightText
