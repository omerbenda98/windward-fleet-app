import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    name: '',
    mmsi: '',
    flag: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    const clearedFilters = { name: '', mmsi: '', flag: '' };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  return (
    <div className="search-bar">
      <h3>Search Vessels</h3>
      <form onSubmit={handleSearch}>
        <div className="search-inputs">
          <input
            type="text"
            name="name"
            placeholder="Vessel Name"
            value={filters.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="mmsi"
            placeholder="MMSI"
            value={filters.mmsi}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="flag"
            placeholder="Flag"
            value={filters.flag}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">Search</button>
          <button type="button" onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
