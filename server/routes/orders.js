import express from "express"
import { placeOrder, getOrder } from "../controllers/orders.js"

const router = express.Router()

router.route("/:orderID").get(getOrder)
router.route("/placeOrder").post(placeOrder)

export default router
