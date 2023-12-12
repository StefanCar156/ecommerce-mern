import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories, getAllBrands } from "../../api/productService.js"
import { setCategories, setBrands } from "../../store/slices/sidebarSlice.js"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.sidebar.categories)
  const brands = useSelector((state) => state.sidebar.brands)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await getAllCategories()
        const brandsRes = await getAllBrands()

        dispatch(setCategories(categoriesRes.data))
        dispatch(setBrands(brandsRes.data))
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <div className="w-64 bg-gray-800 text-white pt-12 p-4">
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      <ul>
        {categories.map((category, i) => (
          <li key={i} className="mb-2">
            <Link to={`/products/category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold mt-8 mb-4">Brands</h3>
      <ul>
        {brands.map((brand, i) => (
          <li key={i} className="mb-2">
            <Link to={`/products/brand/${brand}`}>{brand}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
