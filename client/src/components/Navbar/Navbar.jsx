import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CartDropdown from "../CartDropdown/CartDropdown"

const Navbar = () => {
  const [orderIDInput, setOrderIDInput] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setOrderIDInput(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (orderIDInput.trim() !== "") {
      navigate(`/orders/${orderIDInput}`)
      setOrderIDInput("")
    }
  }

  return (
    <div className="flex items-center justify-between bg-gray-900 text-white py-4 px-12 relative">
      <Link to="/">Home</Link>

      <form onSubmit={handleFormSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Find your order (enter ID)"
          value={orderIDInput}
          onChange={handleInputChange}
          className="mr-2 px-2 py-1 border rounded w-80 focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Go
        </button>
      </form>

      <CartDropdown />
    </div>
  )
}

export default Navbar
