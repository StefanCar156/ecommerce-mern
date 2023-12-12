import Product from "../models/Product.js"

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, pageSize = 5 } = req.query
    const skip = (page - 1) * pageSize

    const products = await Product.find({})
      .skip(skip)
      .limit(parseInt(pageSize, 10))

    const totalCount = await Product.countDocuments({})

    res.json({ products, totalCount })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

const getProduct = async (req, res) => {
  try {
    const productID = req.params.productID

    const product = await Product.findOne({ _id: productID })

    if (!product) {
      return res.status(404).json({ message: "Product not found!" })
    }

    return res.status(200).json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

const searchProductsByName = async (req, res) => {
  try {
    const { query, page = 1, pageSize = 5 } = req.query
    const skip = (page - 1) * pageSize

    const products = await Product.find({
      name: { $regex: new RegExp(query, "i") },
    })
      .skip(skip)
      .limit(parseInt(pageSize, 10))

    const totalCount = await Product.countDocuments({
      name: { $regex: new RegExp(query, "i") },
    })

    return res.status(200).json({ products, totalCount })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

const searchProductsByCategory = async (req, res) => {
  try {
    const encodedCategory = req.params.category
    const category = decodeURIComponent(encodedCategory)
    const { page = 1, pageSize = 5 } = req.query
    const skip = (page - 1) * pageSize

    const products = await Product.find({ category: category })
      .skip(skip)
      .limit(parseInt(pageSize, 10))

    const totalCount = await Product.countDocuments({ category: category })

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products in that category" })
    }

    return res.status(200).json({ products, totalCount })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

const searchProductsByBrand = async (req, res) => {
  try {
    const encodedBrand = req.params.brand
    const brand = decodeURIComponent(encodedBrand)
    const { page = 1, pageSize = 5 } = req.query
    const skip = (page - 1) * pageSize

    const products = await Product.find({ brand: brand })
      .skip(skip)
      .limit(parseInt(pageSize, 10))

    const totalCount = await Product.countDocuments({ brand: brand })

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products in that brand" })
    }

    return res.status(200).json({ products, totalCount })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category")
    res.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// Brands
const getAllBrands = async (req, res) => {
  try {
    const brands = await Product.distinct("brand")
    res.json(brands)
  } catch (error) {
    console.error("Error fetching brands:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export {
  getAllProducts,
  getProduct,
  searchProductsByName,
  searchProductsByCategory,
  searchProductsByBrand,
  getAllCategories,
  getAllBrands,
}
