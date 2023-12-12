import { createSlice } from "@reduxjs/toolkit"
import {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
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
    addToCartReducer: (state, action) => {
      state.cartItems = action.payload
      state.loading = false
      state.error = null
    },
    removeFromCartReducer: (state, action) => {
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

    // After the request is successful, fetch the updated cart
    const updatedCartResponse = await getCartItems()

    // Dispatch the addToCart action with the updated cart items
    dispatch(addToCartReducer(updatedCartResponse.data))
  } catch (error) {
    console.error(error)
  }
}

export const removeItemFromCartAction = (id) => async (dispatch) => {
  try {
    dispatch(setLoading())

    await removeItemFromCart(id)

    const updatedCartResponse = await getCartItems()

    dispatch(removeFromCartReducer(updatedCartResponse.data))
  } catch (error) {
    console.error(error)
  }
}

export const {
  setCartItems,
  addToCartReducer,
  removeFromCartReducer,
  setLoading,
  setError,
} = cartSlice.actions

export default cartSlice.reducer
