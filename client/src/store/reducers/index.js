import { combineReducers } from "@reduxjs/toolkit"
import productReducer from "../slices/productSlice.js"
import sidebarReducer from "../slices/sidebarSlice.js"

const rootReducer = combineReducers({
  products: productReducer,
  sidebar: sidebarReducer,
})

export default rootReducer
