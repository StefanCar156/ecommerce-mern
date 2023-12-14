import "./styles/App.css"
import RoutesComponent from "./router/routes"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCartAction } from "./store/slices/cartSlice"
import { useCookies } from "react-cookie"

function App() {
  const dispatch = useDispatch()
  const cartID = useSelector((state) => state.cart.cartID)
  const [cookie, setCookie] = useCookies(["cart_id"])

  useEffect(() => {
    if (!cookie.cart_id) {
      dispatch(createCartAction())
      setCookie("cart_id", cartID)
    }
  }, [dispatch, cookie.cart_id, cartID])

  return (
    <div id="app">
      <RoutesComponent />
    </div>
  )
}

export default App
