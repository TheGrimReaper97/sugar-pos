// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => (
  <div className="search-bar">
    <input
      type="text"
      value={searchTerm}
      onChange={onSearch}
      placeholder="Buscar productos..."
      className="search-input"
    />
  </div>
);

export default SearchBar;
