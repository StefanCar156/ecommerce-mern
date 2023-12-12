import mongoose from "mongoose"

const cartItemSchema = mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const CartItem = mongoose.model("CartItem", cartItemSchema)

export default CartItem
