import Cart from "../models/Cart.js"

const getCart = async (req, res) => {
  try {
    const cartID = req.params.cartID

    const cart = await Cart.findOne({ _id: cartID })

    return res.status(200).json(cart)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] })

    const cart = await newCart.save()
    return res.status(201).json({ cartID: cart._id })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const addItemToCart = async (req, res) => {
  try {
    const { cartID } = req.params
    const { productID, quantity } = req.body

    const cart = await Cart.findOne({ _id: cartID })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    // If product is already in the cart, just increase quantity
    // Otherwise, add new item
    const existingItem = cart.products.find(
      (item) => item.productID == productID
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.products.push({ productID, quantity })
    }

    await cart.save()

    return res.status(200).json(cart)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const removeItemFromCart = async (req, res) => {
  try {
    const { cartID, itemID } = req.params

    const cart = await Cart.findById(cartID)

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const itemIndex = cart.products.findIndex((item) => item._id == itemID)

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" })
    }

    cart.products.splice(itemIndex, 1)

    await cart.save()

    return res.status(200).json(cart)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const updateItemQuantity = async (req, res) => {
  try {
    const { cartID, itemID } = req.params
    const { newQuantity } = req.body

    const cart = await Cart.findById(cartID)

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const cartItem = cart.products.find((item) => item._id == itemID)

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in the cart" })
    }

    cartItem.quantity = newQuantity

    await cart.save()

    return res.status(201).json(cart)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export {
  getCart,
  createCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
}
