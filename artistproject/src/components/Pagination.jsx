import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Pagination({
  totalPage,
  requestPageNumber,
  onPageChange,
}) {
  const [pages, setPages] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPage) {
      onPageChange(newPage);
    }
  };

  useEffect(() => {
    const getPageNumbers = () => {
      const pages = [];
      if (requestPageNumber > 1) {
        pages.push(requestPageNumber - 1);
      }
      pages.push(requestPageNumber);
      if (requestPageNumber < totalPage) {
        pages.push(requestPageNumber + 1);
        if (requestPageNumber + 2 <= totalPage) {
          pages.push(requestPageNumber + 2);
          if (requestPageNumber == 1) pages.push(requestPageNumber + 3);
        }
      }
      return pages;
    };
    setPages(getPageNumbers());
  }, [requestPageNumber, totalPage]); // Add dependencies

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          className="page-link"
          onClick={() => handlePageChange(requestPageNumber - 1)}
          disabled={requestPageNumber === 1}
        >
          <span aria-hidden="true">&laquo;</span>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => handlePageChange(page)}
            className={`page-item ${
              page === requestPageNumber ? "active" : ""
            }`}
          >
            <span className="page-link">{page}</span>
          </li>
        ))}
        <li
          className="page-link"
          onClick={() => handlePageChange(requestPageNumber + 1)}
          disabled={requestPageNumber === totalPage}
        >
          <span aria-hidden="true">&raquo;</span>
        </li>
      </ul>
    </nav>
  );
}

// Define Prop Types for Validation
Pagination.propTypes = {
  totalPage: PropTypes.number.isRequired,
  requestPageNumber: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
