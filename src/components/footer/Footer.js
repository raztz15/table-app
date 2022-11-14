import React, { useState } from "react";
import "./Footer.css";

export default function Footer({ num, users, setNum }) {
  const nextPage = (number) => {
    setNum((parseInt(number) + 1).toString());
  };

  const prevPage = (number) => {
    setNum((parseInt(number) - 1).toString());
  };
  return (
    <footer>
      <div className="paginating-buttons">
        <button className="previous-button" onClick={() => prevPage(num)}>
          Previous Page
        </button>
        <button className="next-button" onClick={() => nextPage(num)}>
          Next Page
        </button>
      </div>
      <div className="data-info">
        {users.length > 0
          ? `There are ${users.length} users in the table`
          : "No data to display"}
      </div>
    </footer>
  );
}
