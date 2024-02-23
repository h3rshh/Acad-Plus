import React from 'react'
import { IconButton } from './IconButton'

export const ConfirmationModal = ({modalData}) => {
  return (
    <div className=''>

      <div>

         <p>{modalData.text1}</p>
         <p>{modalData.text2}</p>

         <div>
            <IconButton
               onClick={modalData?.btnHandler}
               text={modalData?.btn1Text}
            />
            <button>
               {modalData?.btn2Text}
            </button>
         </div>
      </div>

    </div>
  )
}
