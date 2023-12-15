import React, { useState, useEffect } from "react"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage)

  useEffect(() => {
    setLocalCurrentPage(currentPage)
  }, [currentPage])

  const pagination = (c, m) => {
    const current = c
    const last = m
    const delta = 1
    const left = current - delta
    const right = current + delta + 1
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push("...")
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  const renderPage = (pageNumber) => (
    <li
      key={pageNumber}
      className={`inline-block mx-1 px-3 py-1 border rounded cursor-pointer ${
        localCurrentPage === pageNumber
          ? "bg-blue-500 text-white"
          : "hover:bg-blue-200"
      }`}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </li>
  )

  const renderDots = (key) => (
    <li
      className="inline-block mx-1 px-3 py-1 border rounded"
      key={`dot-${key}`}
    >
      ...
    </li>
  )

  return (
    <ul className="flex">
      {currentPage > 1 && (
        <li
          className="inline-block mx-1 px-3 py-1 border rounded hover:bg-blue-200 cursor-pointer"
          onClick={() => onPageChange(currentPage - 1)}
        >
          &laquo; Prev
        </li>
      )}

      {pagination(currentPage, totalPages).map((item, index) =>
        typeof item === "number"
          ? renderPage(item)
          : renderDots(index.toString())
      )}

      {currentPage < totalPages && (
        <li
          className="inline-block mx-1 px-3 py-1 border rounded hover:bg-blue-200 cursor-pointer"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next &raquo;
        </li>
      )}
    </ul>
  )
}

export default Pagination
