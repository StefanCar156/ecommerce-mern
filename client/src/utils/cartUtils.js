import { getProduct } from "../api/productService"

export const fetchDetailedCartItems = async (cartItems) => {
  if (!cartItems) return []
  const newDetailedCartItems = await Promise.all(
    cartItems.map(async (cartItem) => {
      const productDetails = await getProduct(cartItem.productID)
      return { ...cartItem, ...productDetails }
    })
  )

  return newDetailedCartItems
}
