import React from "react";
import "./SearchInput.css";

const SearchInput = ({ searchQuery, setSearchQuery }) => (
  <div className="input-container">
    <input
      className="input"
      name="text"
      type="text"
      placeholder="Search here..."
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      autoComplete="off"
    />
  </div>
);

export default SearchInput;
