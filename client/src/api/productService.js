import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"

export const getAllProducts = (page, pageSize) => {
  return axios.get(
    `${BASE_URL}/api/v1/products?page=${page}&pageSize=${pageSize}`
  )
}

export const searchProductsByName = (query, page, pageSize) => {
  return axios.get(
    `${BASE_URL}/api/v1/products/search?query=${query}&page=${page}&pageSize=${pageSize}`
  )
}

export const searchProductsByCategory = (category, page, pageSize) => {
  return axios.get(
    `${BASE_URL}/api/v1/products/category/${category}?page=${page}&pageSize=${pageSize}`
  )
}

export const searchProductsByBrand = (brand, page, pageSize) => {
  return axios.get(
    `${BASE_URL}/api/v1/products/brand/${brand}?page=${page}&pageSize=${pageSize}`
  )
}

export const getAllCategories = () => {
  return axios.get(`${BASE_URL}/api/v1/products/categories`)
}

export const getAllBrands = () => {
  return axios.get(`${BASE_URL}/api/v1/products/brands`)
}
