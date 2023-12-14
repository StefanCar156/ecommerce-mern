import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"

export const placeOrder = (cartID, order) => {
  return axios.post(`${BASE_URL}/api/v1/orders/placeOrder`, { cartID, order })
}

export const getOrder = (orderID) => {
  return axios.get(`${BASE_URL}/api/v1/orders/${orderID}`)
}
