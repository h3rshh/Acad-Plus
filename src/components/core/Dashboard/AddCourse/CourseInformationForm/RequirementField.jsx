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

   // Run on the first render
   useEffect( () => {
      register(name, {
         required: true,
         validate: (value) => value.length > 0
      })
   },[])

   // Run everytime there is a change in the requirement list
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
export default function RequirementsField({
   name,
   label,
   register,
   setValue,
   errors,
   getValues,
 }) {
   const { editCourse, course } = useSelector((state) => state.course)
   const [requirement, setRequirement] = useState("")
   const [requirementsList, setRequirementsList] = useState([])
 
   useEffect(() => {
     if (editCourse) {
       setRequirementsList(course?.instructions)
     }
     register(name, { required: true, validate: (value) => value.length > 0 })
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
 
   useEffect(() => {
     setValue(name, requirementsList)
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [requirementsList])
 
   const handleAddRequirement = () => {
     if (requirement) {
       setRequirementsList([...requirementsList, requirement])
       setRequirement("")
     }
   }
 
   const handleRemoveRequirement = (index) => {
     const updatedRequirements = [...requirementsList]
     updatedRequirements.splice(index, 1)
     setRequirementsList(updatedRequirements)
   }
 
   return (
     <div className="flex flex-col space-y-2">
       <label className="text-sm text-richblack-5" htmlFor={name}>
         {label} <sup className="text-pink-200">*</sup>
       </label>
       <div className="flex flex-col items-start space-y-2">
         <input
           type="text"
           id={name}
           value={requirement}
           onChange={(e) => setRequirement(e.target.value)}
           className="form-style w-full"
         />
         <button
           type="button"
           onClick={handleAddRequirement}
           className="font-semibold text-yellow-50"
         >
           Add
         </button>
       </div>
       {requirementsList.length > 0 && (
         <ul className="mt-2 list-inside list-disc">
           {requirementsList.map((requirement, index) => (
             <li key={index} className="flex items-center text-richblack-5">
               <span>{requirement}</span>
               <button
                 type="button"
                 className="ml-2 text-xs text-pure-greys-300 "
                 onClick={() => handleRemoveRequirement(index)}
               >
                 clear
               </button>
             </li>
           ))}
         </ul>
       )}
       {errors[name] && (
         <span className="ml-2 text-xs tracking-wide text-pink-200">
           {label} is required
         </span>
       )}
     </div>
   )
 }