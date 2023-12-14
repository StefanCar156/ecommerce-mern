import express from "express"
import {
  getCart,
  createCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../controllers/cart.js"

const router = express.Router()

router.route("/").post(createCart)
router.route("/:cartID").get(getCart).post(addItemToCart)
router
  .route("/:cartID/:itemID")
  .delete(removeItemFromCart)
  .patch(updateItemQuantity)

export default router
