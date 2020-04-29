import React from "react";

const Pagination = ({ memesPerPage, totalMemes, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMemes / memesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <a
              onClick={() => {
                paginate(number);
              }}
              href="!#"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
