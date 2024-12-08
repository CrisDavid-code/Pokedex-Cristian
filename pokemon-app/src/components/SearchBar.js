import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    onSearch(input);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
