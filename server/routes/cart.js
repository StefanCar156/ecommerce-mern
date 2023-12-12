import express from "express"
import {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  //   clearCart,
} from "../controllers/cart.js"

const router = express.Router()

router.route("/").get(getCartItems).post(addItemToCart)
router.route("/:itemID").delete(removeItemFromCart).patch(updateItemQuantity)
// router.route("/clear-cart").delete(clearCart)

export default router
