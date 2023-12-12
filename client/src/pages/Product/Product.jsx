import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../../api/productService"
import { formatCurrency } from "../../utils/formatCurrency"
import { useDispatch } from "react-redux"
import { addToCartAction } from "../../store/slices/cartSlice"

const Product = () => {
  // Redux
  const dispatch = useDispatch()

  // State
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  // Params
  const { productID } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProduct(productID)
      setProduct(res.data)
      setIsLoading(false)
    }

    fetchProduct()
  }, [productID])

  const handleAddToCart = async () => {
    try {
      dispatch(addToCartAction(product._id, quantity))
      setQuantity(1)
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return <h1>loading</h1>
  }

  return (
    <div className="container mt-8 px-4">
      <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6">
        <div>
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[0]
                : ""
            }
            alt={product.name}
            className="w-full md:w-auto lg:w-auto h-auto md:max-w-sm rounded-md"
          />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4 text-xs md:text-sm lg:text-base">
            {product.description}
          </p>
          <p className="text-lg font-bold mb-2">
            {formatCurrency(product.price)}
          </p>
          <p className="text-gray-600 mb-4">In Stock: {product.quantity}</p>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-gray-600 mb-4">Brand: {product.brand}</p>
          <p className="text-yellow-500 mb-4">Rating: {product.rating}</p>

          <div className="flex items-center space-x-4">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              max={product.quantity}
              className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Product Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {product.images &&
            product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-auto rounded-md"
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Product
