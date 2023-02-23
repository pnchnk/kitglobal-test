import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCartItems } from "./type";
import { ShoppingCartItem } from "../../types";

const initialState: ShoppingCartItems = {
  basketItems: [],
  }


  const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
      addToCart: (state, { payload }:PayloadAction<ShoppingCartItem>) => {
        let isInArray = false;
  
        // if the product is already exist in array
        state.basketItems?.forEach((el) => {
          if (el.id === payload.id) {
            isInArray = true;
            el.quantity++
          }
        });
        if (!isInArray) {
          state.basketItems?.push({ ...payload, quantity: 1 });
        }
        
      },
  
      deleteFromCart: (state, { payload }) => {
        const id = payload.id;
        state.basketItems = state?.basketItems?.filter(item => item.id !== id);
      },
  
      buttonPlus: (state, { payload }) => {
        state.basketItems?.forEach((el) => {
          if (el.id === payload.id) {
            el.quantity++
          }
        });
      },
  
      buttonMinus: (state, { payload }) => {
        state.basketItems?.forEach((el) => {
          if (el.id === payload.id) {
            el.quantity--
          }
          if (el.quantity === 0){
            state.basketItems = state.basketItems?.filter(item => item.id !== payload.id);
          }
        });
      },
  
      //input change from Cart page
      inputOnChange: (state, { payload }) => {
        const id = payload.product.id
        const value  = Number(payload.value)
        state.basketItems?.forEach((el) => {
          if (el.id === id && el.quantity > 0) {
            el.quantity = value
          }
        });
      },

      cleanCart:(state) => {
        let emptyArr: any = []
        state.basketItems = emptyArr;
      },
    },
  });

  export const { addToCart, deleteFromCart, buttonPlus, buttonMinus, inputOnChange, cleanCart } = shoppingCartSlice.actions;
  export default shoppingCartSlice.reducer;