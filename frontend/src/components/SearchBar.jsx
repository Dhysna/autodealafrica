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
          placeholder="Rechercher par marque, modèle ou description..."
          value={filters.search}
          onChange={handleChange}
          className="search-input"
        />

        <select name="fuel" value={filters.fuel} onChange={handleChange} className="filter-select">
          <option value="">Type de Carburant</option>
          <option value="Petrol">Essence</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Électrique</option>
          <option value="Hybrid">Hybride</option>
        </select>

        <select name="transmission" value={filters.transmission} onChange={handleChange} className="filter-select">
          <option value="">Transmission</option>
          <option value="Automatic">Automatique</option>
          <option value="Manual">Manuelle</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Prix Min"
          value={filters.minPrice}
          onChange={handleChange}
          className="price-input"
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Prix Max"
          value={filters.maxPrice}
          onChange={handleChange}
          className="price-input"
        />

        <button onClick={handleReset} className="btn-reset">
          Réinitialiser
        </button>
      </div>
    </div>
  )
}

export default SearchBar
