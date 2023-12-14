import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"

export const createCart = () => {
  return axios.post(`${BASE_URL}/api/v1/cart`)
}

export const getCart = (cartID) => {
  return axios.get(`${BASE_URL}/api/v1/cart/${cartID}`)
}

export const addItemToCart = (cartID, productID, quantity) => {
  return axios.post(`${BASE_URL}/api/v1/cart/${cartID}`, {
    productID,
    quantity,
  })
}

export const removeItemFromCart = (cartID, itemID) => {
  return axios.delete(`${BASE_URL}/api/v1/cart/${cartID}/${itemID}`)
}

export const updateItemQuantity = (cartID, itemID, newQuantity) => {
  return axios.patch(`${BASE_URL}/api/v1/cart/${cartID}/${itemID}`, {
    newQuantity,
  })
}
