import { createSlice } from "@reduxjs/toolkit"
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  createCart,
} from "../../api/cartService"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartID: null,
    cart: {},
    loading: false,
    error: null,
  },
  reducers: {
    setCartID: (state, action) => {
      state.cartID = action.payload
      state.loading = false
    },
    setCart: (state, action) => {
      state.cart = action.payload
      state.loading = false
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

export const { setCartID, setCart, setLoading, setError } = cartSlice.actions
export default cartSlice.reducer

export const createCartAction = () => async (dispatch) => {
  try {
    const res = await createCart()
    dispatch(setCartID(res.data.cartID))
  } catch (error) {
    dispatch(setError(error))
  }
}

export const getCartAction = (cartID) => async (dispatch) => {
  try {
    dispatch(setLoading())
    dispatch(setCartID(cartID))

    const res = await getCart(cartID)
    dispatch(setCart(res.data))
  } catch (error) {
    dispatch(setError(error))
  }
}

export const addItemToCartAction =
  (cartID, productID, quantity) => async (dispatch) => {
    try {
      dispatch(setLoading())
      dispatch(setCartID(cartID))

      const res = await addItemToCart(cartID, productID, quantity)

      if (res.status === 404) {
        createCartAction(cartID)
      }

      dispatch(setCart(res.data))
    } catch (error) {
      dispatch(setError(error))
    }
  }

export const removeItemFromCartAction =
  (cartID, itemID) => async (dispatch) => {
    try {
      dispatch(setLoading())
      dispatch(setCartID(cartID))

      const res = await removeItemFromCart(cartID, itemID)
      dispatch(setCart(res.data))
    } catch (error) {
      dispatch(setError(error))
    }
  }

export const changeItemQuantityAction =
  (cartID, itemID, newQuantity) => async (dispatch) => {
    try {
      dispatch(setLoading())
      dispatch(setCartID(cartID))

      const res = await updateItemQuantity(cartID, itemID, newQuantity)
      dispatch(setCart(res.data))
    } catch (error) {
      dispatch(setError(error))
    }
  }
