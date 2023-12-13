import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"

export const getCartItems = () => {
  return axios.get(`${BASE_URL}/api/v1/cart`)
}

export const addItemToCart = (productID, quantity) => {
  return axios.post(`${BASE_URL}/api/v1/cart`, { productID, quantity })
}

export const removeItemFromCart = (id) => {
  return axios.delete(`${BASE_URL}/api/v1/cart/${id}`)
}

export const updateItemQuantity = (id, newQuantity) => {
  return axios.patch(`${BASE_URL}/api/v1/cart/${id}`, { newQuantity })
}
