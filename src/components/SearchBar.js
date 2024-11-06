// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => (
  <div className="search-bar">
    <input
      type="text"
      value={searchTerm}
      onChange={onSearch}
      placeholder="Buscar productos por nombre o SKU..."
      className="search-input"
    />
  </div>
);

export default SearchBar;
