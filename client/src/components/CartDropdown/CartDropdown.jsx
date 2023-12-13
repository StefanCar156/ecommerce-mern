import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchCartItems,
  removeItemFromCartAction,
  changeItemQuantityAction,
} from "../../store/slices/cartSlice"
import { getProduct } from "../../api/productService"
import { formatCurrency } from "../../utils/formatCurrency"
import { Link } from "react-router-dom"
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

const CartDropdown = () => {
  // Redux
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const loading = useSelector((state) => state.cart.loading)
  const errors = useSelector((state) => state.cart.errors)

  // State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [detailedCartItems, setDetailedCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const dropdownRef = useRef(null)

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [])

  useEffect(() => {
    const fetchCartItemsDetails = async () => {
      const newDetailedCartItems = await Promise.all(
        cartItems.map(async (cartItem) => {
          const productDetails = await getProduct(cartItem.productID)
          return { ...cartItem, ...productDetails }
        })
      )

      setDetailedCartItems(newDetailedCartItems)
    }

    fetchCartItemsDetails()
  }, [cartItems])

  useEffect(() => {
    const total = detailedCartItems.reduce(
      (acc, item) => acc + item.quantity * item.data.price,
      0
    )

    setCartTotal(total)
  }, [detailedCartItems])

  const handleRemoveCartItem = async (id) => {
    try {
      dispatch(removeItemFromCartAction(id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeItemQuantity = async (id, newQuantity) => {
    if (newQuantity === 0) {
      return handleRemoveCartItem(id)
    }

    try {
      dispatch(changeItemQuantityAction(id, newQuantity))
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseDropdown = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.classList.contains("add-to-cart-btn")
    ) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown)

    return () => {
      document.removeEventListener("click", handleCloseDropdown)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <FaShoppingCart className="text-2xl" />
      </button>
      {isDropdownOpen && (
        <div className="absolute top-full right-0 bg-gray-300 text-black w-96 shadow-md p-4 rounded-md">
          <ul className="list-none p-0 overflow-y-auto max-h-96 scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-200 relative">
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
                <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin w-12 h-12"></div>
              </div>
            )}
            {detailedCartItems.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between space-x-4 pb-2 mb-2 last-of-type:mb-0 w-full border-b"
              >
                <img
                  src={item.data.images[0]}
                  alt={item.data.name}
                  className="w-16 rounded-md"
                />
                <div className="flex flex-col items-center">
                  <p className="text-base font-semibold">{item.data.name}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() =>
                        handleChangeItemQuantity(item._id, item.quantity - 1)
                      }
                      className="transition-transform transform active:scale-125"
                    >
                      <FaMinus />
                    </button>
                    <span className="font-semibold text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleChangeItemQuantity(item._id, item.quantity + 1)
                      }
                      className="transition-transform transform active:scale-125"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <p className="mt-2">
                    {item.quantity} &times; {formatCurrency(item.data.price)}{" "}
                    &#61;{" "}
                    <span className="font-semibold">
                      {formatCurrency(item.quantity * item.data.price)}
                    </span>
                  </p>
                </div>
                <button
                  className="self-start"
                  onClick={() => handleRemoveCartItem(item._id)}
                >
                  <IoClose />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Total:{" "}
            <span className="font-semibold">{formatCurrency(cartTotal)}</span>
          </p>
          <Link
            to="/checkout"
            className="block mt-3 px-4 py-2 text-center bg-green-500 text-white rounded-md
             hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartDropdown
