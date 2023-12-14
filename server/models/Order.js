import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
  shippingInfo: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  cartItems: [
    {
      productID: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      priceAtATime: {
        type: Number,
        required: true,
      },
    },
  ],
  cartTotal: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
  },
})

const Order = mongoose.model("Order", orderSchema)
export default Order
