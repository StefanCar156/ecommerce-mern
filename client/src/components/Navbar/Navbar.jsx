import React from "react"
import { Link } from "react-router-dom"
import CartDropdown from "../CartDropdown/CartDropdown"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white py-4 px-12 relative">
      <Link to="/">Home</Link>
      <CartDropdown />
    </div>
  )
}

export default Navbar
