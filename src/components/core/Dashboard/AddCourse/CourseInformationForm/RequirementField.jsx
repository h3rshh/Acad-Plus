import React, { useEffect, useState } from 'react'

export const RequirementField = ({name, label, register, setValue, getValues}) => {

   const [requirement, setRequirement] = useState("");
   const [requirementList, setRequirementList] = useState([])

   const handleAddRequirement = () => {
      if(requirement){
         setRequirementList([...requirementList, requirement])
         setRequirement("")
      }
   }

   // use splice function to remove a particular element from the list
   const handleRemoveRequirement = (index) => {
      const updatedRequirementList = [...requirementList];
      updatedRequirementList.splice(index, 1)
      setRequirementList(updatedRequirementList);
   }

   useEffect( () => {
      register(name, {
         required: true,
         validate: (value) => value.length > 0
      })
   },[])

   useEffect( () => {
      setValue(name, requirementList)
   }, [requirementList])

  return (
   <div>
      
      <label>{label}<sup>*</sup></label>
      <div>
         <input
            type='text'
            id={name}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className='w-full'
         />

         <button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-50'
         >Add</button>   
      </div>

      {
         requirementList.length > 0 && (
            <ul>
               {
                  requirementList.map((requirement, index) => (
                     <li key={index} className='flex items-center text-richblack-5'>
                        
                        <span>{requirement}</span>
                        <button
                           type='button'
                           onClick={handleRemoveRequirement(index)}
                           className='text-sx text-pure-greys-300'
                        >
                           Clear
                        </button>
                     </li>
                  ))
               }
            </ul>
         )
      }

   </div>
  )
}
