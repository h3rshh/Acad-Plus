import React from 'react'

export const IconButton = ({
   text,
   onClick,
   children,
   disabled,
   outline=false,
   custonClasses,
   type
}) => {
  return (
    
      <button
         disabled={disabled}
         onClick={onClick}
         type={type}>
         {
            children ? (
            <div>   
               <span>
                  {text}
               </span>
               {children}
            </div>   
               ) 
            : (
               text
            )
         }
      </button>
  )
}
