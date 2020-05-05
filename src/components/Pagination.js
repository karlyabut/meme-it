import React from "react";
import "../components/Pagination.css";

const Pagination = ({ currentPage, memesPerPage, totalMemes, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMemes / memesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul>
      <div className="pagination">
        {currentPage === 1 ? null : (
          <a
            href="#"
            onClick={() => {
              paginate(currentPage - 1);
            }}
          >
            &laquo;
          </a>
        )}
      </div>
      {pageNumbers.map(number => (
        <div className="pagination">
          <li key={number} className="pageItem">
            <a
              className={
                currentPage === number ? "pagination activePage" : "pagination"
              }
              onClick={() => {
                paginate(number);
              }}
              href="!#"
            >
              {number}
            </a>
          </li>
        </div>
      ))}
      <div className="pagination">
        {currentPage === pageNumbers.length ? null : (
          <a
            href="#"
            onClick={() => {
              paginate(currentPage + 1);
            }}
          >
            &raquo;
          </a>
        )}
      </div>
    </ul>
  );
};

export default Pagination;
