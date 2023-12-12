import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="bg-gray-900 text-white p-4">
      <Link to="/">Home</Link>
    </div>
  )
}

export default Navbar
