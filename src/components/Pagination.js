import React from "react";
import "../components/Pagination.css";

const Pagination = ({ memesPerPage, totalMemes, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMemes / memesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul>
      <div className="pagination">
        <a href="#">&laquo;</a>
      </div>
      {pageNumbers.map(number => (
        <div className="pagination">
          <li key={number} className="pageItem">
            <a
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
        <a href="#">&raquo;</a>
      </div>
    </ul>
  );
};

export default Pagination;
