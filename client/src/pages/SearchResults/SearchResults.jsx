import React, { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import ProductList from "../../components/ProductList/ProductList"
import {
  fetchProductsByCategory,
  fetchProductsByBrand,
} from "../../store/slices/productSlice.js"
import { useDispatch, useSelector } from "react-redux"

const SearchResults = () => {
  // Redux
  const dispatch = useDispatch()
  const totalCount = useSelector((state) => state.products.data.totalCount)
  const products = useSelector((state) => state.products.data.currentProducts)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  // State
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Params
  const { category, brand } = useParams()
  const { query } = useSearchParams()

  useEffect(() => {
    let searchMethod
    category
      ? (searchMethod = "category")
      : brand
      ? (searchMethod = "brand")
      : (searchMethod = "name")

    if (searchMethod === "category") {
      dispatch(fetchProductsByCategory(category, currentPage, pageSize))
    } else if (searchMethod === "brand") {
      dispatch(fetchProductsByBrand(brand, currentPage, pageSize))
    }
  }, [dispatch, currentPage, category, brand])

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  // Render
  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error: {error}</h1>
  }

  if (products.length === 0) {
    return <h2>No featured products available</h2>
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Search Results</h2>
      <ProductList
        products={products}
        currentPage={currentPage}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default SearchResults
