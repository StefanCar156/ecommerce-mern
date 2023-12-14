import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home/Home"
import NotFound from "../pages/NotFound/NotFound"
import Product from "../pages/Product/Product"
import Sidebar from "../components/Sidebar/Sidebar"
import Navbar from "../components/Navbar/Navbar"
import SearchResults from "../pages/SearchResults/SearchResults"
import Checkout from "../pages/Checkout/Checkout"
import Order from "../pages/Order/Order"

const RoutesComponent = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <Navbar className="bg-blue-500 text-white p-4" />

        {/* Flex Container for Sidebar and Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar className="w-1/4 bg-gray-800 text-white p-4" />

          {/* Main Content */}
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:productID" element={<Product />} />
              <Route
                path="/products/category/:category"
                element={<SearchResults />}
              />
              <Route
                path="/products/brand/:brand"
                element={<SearchResults />}
              />
              <Route path="/products/search" element={<SearchResults />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders/:orderID" element={<Order />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default RoutesComponent
