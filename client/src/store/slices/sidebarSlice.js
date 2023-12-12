import { createSlice } from "@reduxjs/toolkit"

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    categories: [],
    brands: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setBrands: (state, action) => {
      state.brands = action.payload
    },
  },
})

export const { setCategories, setBrands } = sidebarSlice.actions
export default sidebarSlice.reducer
