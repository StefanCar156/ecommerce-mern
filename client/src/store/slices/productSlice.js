import { createSlice } from "@reduxjs/toolkit"
import {
  getAllProducts,
  searchProductsByBrand,
  searchProductsByCategory,
} from "../../api/productService.js"

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: {
      currentProducts: [],
      totalCount: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentProductsData: (state, action) => {
      state.data.currentProducts = action.payload.products
      state.data.totalCount = action.payload.totalCount
      state.loading = false
      state.error = null
    },
    setLoading: (state) => {
      state.loading = true
    },
    setError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { setCurrentProductsData, setLoading, setError } =
  productSlice.actions

export const fetchAllProducts = (currentPage, pageSize) => async (dispatch) => {
  try {
    dispatch(setLoading())
    const res = await getAllProducts(currentPage, pageSize)
    dispatch(setCurrentProductsData(res.data))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const fetchProductsByCategory =
  (category, currentPage, pageSize) => async (dispatch) => {
    try {
      dispatch(setLoading())
      const res = await searchProductsByCategory(
        category,
        currentPage,
        pageSize
      )
      dispatch(setCurrentProductsData(res.data))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }

export const fetchProductsByBrand =
  (brand, currentPage, pageSize) => async (dispatch) => {
    try {
      dispatch(setLoading())
      const res = await searchProductsByBrand(brand, currentPage, pageSize)
      dispatch(setCurrentProductsData(res.data))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }

export default productSlice.reducer
