import React from 'react';

const Filters = ({ search, setSearch, category, setCategory, sort, setSort, categories }) => {
  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setSort('');
  };

  return (
    <div className="filters">
      <input 
        type="text" 
        placeholder="Search products..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="lowHigh">Price: Low to High</option>
        <option value="highLow">Price: High to Low</option>
      </select>
      <button onClick={clearFilters}>Clear All</button>
    </div>
  );
};

export default Filters;