import { IconButton } from 'components/common/IconButton'
import React from 'react'
import { useSelector } from 'react-redux'

export const RenderTotalAmount = () => {

  const {total, cart} = useSelector( (state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map( (course) => course._id_);
    console.log("Bought these courses : ", courses);
    // TODO API integrate -> Payment Gateway tak lekar jaayenge

  }

  return (
    <div>

      <p>Total : </p>
      <p>Rs {total}</p>

      <IconButton
         text="Buy Now"
         onClick={handleBuyCourse}
            
      />

    </div>
  )
}
