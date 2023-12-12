import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../../store/slices/productSlice.js"
import ProductList from "../../components/ProductList/ProductList.jsx"

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.data.currentProducts)
  const totalCount = useSelector((state) => state.products.data.totalCount)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    dispatch(fetchAllProducts(currentPage, pageSize))
  }, [dispatch, currentPage])

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
      <div className="section-header text-3xl font-bold mb-4">
        <h2>Featured Products</h2>
      </div>
      <ProductList
        products={products}
        currentPage={currentPage}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default Home
