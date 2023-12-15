import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOrder } from "../../api/orderService"
import { formatCurrency } from "../../utils/formatCurrency"
import { fetchDetailedCartItems } from "../../utils/cartUtils"
import moment from "moment"

const Order = () => {
  const [order, setOrder] = useState({})
  const { orderID } = useParams()
  const [detailedCartItems, setDetailedCartItems] = useState([])

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrder(orderID)
      setOrder(res.data)
    }

    fetchOrder()
  }, [orderID])

  useEffect(() => {
    const fetchCartItemsDetails = async () => {
      const newDetailedCartItems = await fetchDetailedCartItems(order.cartItems)

      setDetailedCartItems(newDetailedCartItems)
    }

    fetchCartItemsDetails()
  }, [order])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(order._id)
    alert("Order ID copied to clipboard!")
  }

  return (
    <div>
      {Object.keys(order).length > 0 && (
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-2">Order Details</h2>
            <p className="font-semibold text-lg my-4">
              Order ID:{" "}
              <span
                className="cursor-pointer font-medium"
                onClick={copyToClipboard}
              >
                {order._id}
              </span>{" "}
              <span className="font-normal">
                (Save this, bozo! You're gonna need it)
              </span>
            </p>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Shipping Information:
              </h3>
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {order.shippingInfo.name}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {order.shippingInfo.address}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {order.shippingInfo.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {order.shippingInfo.phone}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Ordered Products:</h3>
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
            <h3 className="text-xl font-semibold mb-2">Order Summary:</h3>
            <p>
              <span className="font-semibold">Total:</span>{" "}
              {formatCurrency(order.cartTotal)}
            </p>
            <p>
              <span className="font-semibold">Order Date:</span>{" "}
              {moment(order.orderDate).format("MMMM D, YYYY [at] h:mm:ss A z")}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {order.status}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order
