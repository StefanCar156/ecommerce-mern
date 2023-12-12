import { combineReducers } from "@reduxjs/toolkit"
import productReducer from "../slices/productSlice.js"
import sidebarReducer from "../slices/sidebarSlice.js"
import cartReducer from "../slices/cartSlice.js"

const rootReducer = combineReducers({
  products: productReducer,
  sidebar: sidebarReducer,
  cart: cartReducer,
})

export default rootReducer
