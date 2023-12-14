import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { formatCurrency } from "../../utils/formatCurrency"
import { fetchDetailedCartItems } from "../../utils/cartUtils"
import { placeOrder } from "../../api/orderService"
import { useNavigate } from "react-router-dom"
import { getCartAction } from "../../store/slices/cartSlice"
import { useCookies } from "react-cookie"

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)

  const [detailedCartItems, setDetailedCartItems] = useState([])
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  })

  const [cookies, setCookies] = useCookies(["cart_id"])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItemsDetails = async () => {
      const newDetailedCartItems = await fetchDetailedCartItems(cart.products)
      setDetailedCartItems(newDetailedCartItems)
    }

    fetchCartItemsDetails()
  }, [cart])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))
  }

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validatePhoneNumberFormat(phoneNumber) {
    const phoneRegex = /^[0-9+]+$/
    return phoneRegex.test(phoneNumber)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate fields
    const newErrors = {}

    if (!validateEmailFormat(shippingInfo.email)) {
      newErrors.email = "Invalid email"
    }
    if (!validatePhoneNumberFormat(shippingInfo.phone)) {
      newErrors.phone =
        "Invalid phone number. Please use only numbers and the plus symbol (+)."
    }

    Object.keys(shippingInfo).forEach((key) => {
      if (!shippingInfo[key]) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const cartTotal = detailedCartItems.reduce(
        (acc, item) => acc + item.quantity * item.data.price,
        0
      )

      let cartItemsWithPrice = JSON.parse(JSON.stringify(cart.products))

      for (let i = 0; i < cart.products.length; i++) {
        cartItemsWithPrice[i].priceAtATime = detailedCartItems[0].data.price
      }

      let order = {
        shippingInfo,
        cartItems: cartItemsWithPrice,
        cartTotal,
      }

      const res = await placeOrder(cookies.cart_id, order)

      setShippingInfo({
        name: "",
        address: "",
        email: "",
        phone: "",
      })

      dispatch(getCartAction(cookies.cart_id))

      navigate(`/orders/${res.data._id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-2">Cart</h2>
        <ul className="list-inside">
          {detailedCartItems.map((item) => (
            <li key={item.data._id} className="mb-4 flex items-center">
              <img
                src={item.data.images[0]}
                alt={item.data.name}
                className="w-12 h-12 object-cover rounded-md mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold">{item.data.name}</h4>
                <p className="text-gray-600 mb-1">
                  Quantity: {item.quantity} | Price per unit:{" "}
                  {formatCurrency(item.data.price)}
                </p>
                <p className="font-semibold">
                  Total: {formatCurrency(item.quantity * item.data.price)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Shipping Information:</h3>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleInputChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.name && "border-red-500"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.address && "border-red-500"
              }`}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email *
            </label>
            <input
              type="text"
              name="email"
              value={shippingInfo.email}
              onChange={handleInputChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.email && "border-red-500"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Phone *
            </label>
            <input
              type="text"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleInputChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.phone && "border-red-500"
              }`}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>
          <button className="bg-blue-500 text-white max-w-xs px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Place Order
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
