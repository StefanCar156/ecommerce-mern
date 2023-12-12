import { formatCurrency } from "../../utils/formatCurrency"
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
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
    </div>
  )
}

export default ProductCard
