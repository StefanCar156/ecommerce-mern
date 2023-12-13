import React from "react"
import { useDispatch } from "react-redux"
import { addToCartAction } from "../../store/slices/cartSlice"
import { formatCurrency } from "../../utils/formatCurrency"
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCartAction(product._id, 1))
  }

  return (
    <div className="border p-4 mb-4 flex flex-col items-center">
      <img src={product.images[0]} alt="Product image" />
      <Link to={`/product/${product._id}`}>
        <h3 className="text-base text-center font-medium my-3">
          {product.name}
        </h3>
      </Link>
      <p className="text-gray-600 mb-2 mt-auto">
        {formatCurrency(product.price)}
      </p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2 add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
