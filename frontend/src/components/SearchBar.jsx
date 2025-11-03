import './SearchBar.css'

function SearchBar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      fuel: '',
      transmission: ''
    });
  };

  return (
    <div className="search-bar">
      <div className="search-row">
        <input
          type="text"
          name="search"
          placeholder="Search by brand, model, or description..."
          value={filters.search}
          onChange={handleChange}
          className="search-input"
        />

        <select name="fuel" value={filters.fuel} onChange={handleChange} className="filter-select">
          <option value="">Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <select name="transmission" value={filters.transmission} onChange={handleChange} className="filter-select">
          <option value="">Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
          className="price-input"
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
          className="price-input"
        />

        <button onClick={handleReset} className="btn-reset">
          Reset
        </button>
      </div>
    </div>
  )
}

export default SearchBar
