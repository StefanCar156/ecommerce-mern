import { createSlice } from "@reduxjs/toolkit"
import {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../../api/cartService"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload
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

export const fetchCartItems = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const res = await getCartItems()
    dispatch(setCartItems(res.data))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const addToCartAction = (productID, quantity) => async (dispatch) => {
  try {
    dispatch(setLoading())

    await addItemToCart(productID, quantity)

    const updatedCartResponse = await getCartItems()
    dispatch(setCartItems(updatedCartResponse.data))
  } catch (error) {
    console.error(error)
  }
}

export const removeItemFromCartAction = (id) => async (dispatch) => {
  try {
    dispatch(setLoading())

    await removeItemFromCart(id)

    const updatedCartResponse = await getCartItems()
    dispatch(setCartItems(updatedCartResponse.data))
  } catch (error) {
    console.error(error)
  }
}

export const changeItemQuantityAction =
  (id, newQuantity) => async (dispatch) => {
    try {
      dispatch(setLoading())

      // Call your API to update the quantity
      await updateItemQuantity(id, newQuantity)

      // Fetch updated cart items after updating the quantity
      const updatedCartResponse = await getCartItems()
      dispatch(setCartItems(updatedCartResponse.data))
    } catch (error) {
      console.error(error)
    }
  }

export const { setCartItems, setLoading, setError } = cartSlice.actions

export default cartSlice.reducer
