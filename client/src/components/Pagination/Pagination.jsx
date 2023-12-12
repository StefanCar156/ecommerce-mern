import React, { useState, useEffect } from "react"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage)

  useEffect(() => {
    setLocalCurrentPage(currentPage)
  }, [currentPage])

  const renderPageNumbers = () => {
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`inline-block mx-1 px-3 py-1 border rounded cursor-pointer ${
            localCurrentPage === i
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-200"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      )
    }

    return pageNumbers
  }

  const handlePageChange = (pageNumber) => {
    setLocalCurrentPage(pageNumber)
    onPageChange(pageNumber)
  }

  return (
    <ul className="inline-block">
      {currentPage > 1 && (
        <li
          className="inline-block mx-1 px-3 py-1 border rounded hover:bg-blue-200 cursor-pointer"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &laquo; Prev
        </li>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages && (
        <li
          className="inline-block mx-1 px-3 py-1 border rounded hover:bg-blue-200 cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next &raquo;
        </li>
      )}
    </ul>
  )
}

export default Pagination
