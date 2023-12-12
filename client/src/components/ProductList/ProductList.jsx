import React, { useState } from "react"
import ProductCard from "../ProductCard/ProductCard"
import Pagination from "../Pagination/Pagination"

const ProductList = ({ products, currentPage, totalCount, onPageChange }) => {
  const productsPerPage = 10
  const totalPages = Math.ceil(totalCount / productsPerPage)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default ProductList
