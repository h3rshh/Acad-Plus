import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

const initialState = {
   cart: localStorage.getItem("cart")
   ? JSON.parse(localStorage.getItem("cart")) : [],

   cart: localStorage.getItem("total")
   ? JSON.parse(localStorage.getItem("total")) : 0,

   cart: localStorage.getItem("totalItems")
   ? JSON.parse(localStorage.getItem("totalItems")) : 0,
   
};

const cartSlice = createSlice({
   name: "cart",
   initialState: initialState,
   reducers: {

      addToCart: (state, action) => {
         const course = action.payload
         const index = state.cart.findIndex((item) => item._id === course._id);

         if(index >= 0){
            toast.error("Course already in Cart");
            return
         }
         
         // Add the course if it is not already Present
         state.cart.push(course)
         state.setTotalItems++

         state.total += course.price

         // Update the LocalStorage
         localStorage.setItem("cart", JSON.stringify(state.cart))
         localStorage.setItem("total", JSON.stringify(state.total))
         localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

         toast.success("Course Added To Cart")
      },

      removeFromCart(state, action){
         const courseId = action.payload
         const index = state.cart.findIndex( (item) => item._id === courseId)

         if(index >= 0){
            state.totalItems--
            state.total -= state.cart[index].price
            state.cart.splice(index, 1)

            localStorage.setItem("cart", JSON.stringify(state.cart))
         }
      },

      setTotalItems(state, value){
         state.token = value.payload
      },
      resetCart(state, value){
         state.cart = 0;
      }

      // Add to Cart
      // Remove from Cart
      // Reset Cart
   }
})

export const {setTotalItems, resetCart} = cartSlice.actions;
export default cartSlice.reducer;