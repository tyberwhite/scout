import React from "react";

function Search() {
  return (
    <div className="search-container">
      <form>
        <input
          type="text"
          id="search-box-input"
          name="search-box-input"
          placeholder="85.196.32.148"
          required
        />
        <button type="submit" id="search-box-btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
