import express from "express"
import {
  getAllProducts,
  getProduct,
  searchProductsByName,
  searchProductsByCategory,
  searchProductsByBrand,
  getAllCategories,
  getAllBrands,
} from "../controllers/products.js"
const router = express.Router()

router.route("/").get(getAllProducts)
router.route("/product/:productID").get(getProduct)
router.route("/search").get(searchProductsByName)
router.route("/category/:category").get(searchProductsByCategory)
router.route("/brand/:brand").get(searchProductsByBrand)

router.route("/categories").get(getAllCategories)
router.route("/brands").get(getAllBrands)

export default router
