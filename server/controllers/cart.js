import CartItem from "../models/CartItem.js"

const getCartItems = async (req, res) => {
  try {
    const items = await CartItem.find({})

    return res.status(200).json(items)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const addItemToCart = async (req, res) => {
  try {
    const newItem = await CartItem(req.body)

    await newItem.save()
    return res.status(201).json({ message: "Item added to cart!" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const removeItemFromCart = async (req, res) => {
  try {
    const itemID = req.params.itemID

    const item = await CartItem.findOne({ _id: itemID })

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    await CartItem.deleteOne({ _id: itemID })

    return res.status(200).json({ message: "Item removed successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const updateItemQuantity = async (req, res) => {
  try {
    const itemID = req.params.itemID
    const newQuantity = req.body.newQuantity

    const item = await CartItem.findOne({ _id: itemID })

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    await CartItem.updateOne({ _id: itemID }, { quantity: newQuantity })

    return res.status(201).json({ message: "Quantity updated successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

// const clearCart = async (req, res) => {
//   try {
//     await CartItem.deleteMany({})

//     return res.status(204).json({ message: "Cart cleared successfully" })
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ message: "Internal server error" })
//   }
// }

export {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  //   clearCart,
}
