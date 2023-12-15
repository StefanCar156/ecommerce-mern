import Order from "../models/Order.js"
import Cart from "../models/Cart.js"

const getOrder = async (req, res) => {
  try {
    const { orderID } = req.params

    const order = await Order.findOne({ _id: orderID })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    let timePassed = Date.now() - order.orderDate

    if (timePassed > 86400000 && timePassed <= 172800000) {
      order.status = "Awaiting Shipment"
    } else if (timePassed > 172800000 && timePassed <= 345600000) {
      order.status = "Shipped"
    } else if (timePassed > 345600000) {
      order.status = "Delivered"
    }

    await order.save()

    return res.status(200).json(order)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const placeOrder = async (req, res) => {
  try {
    const { cartID } = req.body
    const { shippingInfo, cartItems, cartTotal } = req.body.order

    const orderDate = new Date()
    const newOrder = {
      shippingInfo,
      cartItems,
      cartTotal,
      orderDate,
      status: "Pending",
    }

    const order = await Order.create(newOrder)

    // Clear cart
    await Cart.updateOne({ _id: cartID }, { $set: { products: [] } })

    return res.status(201).json(order)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export { placeOrder, getOrder }
