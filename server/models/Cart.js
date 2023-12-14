import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    // required: true,
  },
})

const cartSchema = mongoose.Schema({
  products: [productSchema],
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart
