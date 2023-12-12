import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
})

const Product = mongoose.model("Product", productSchema)

export default Product
