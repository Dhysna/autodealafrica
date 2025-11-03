import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CarList from './components/CarList'
import CarForm from './components/CarForm'
import Footer from './components/Footer'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuel: '',
    transmission: ''
  });

  // Fetch cars from API
  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cars`);
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...cars];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(car =>
        car.brand.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower) ||
        car.description?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.brand) {
      filtered = filtered.filter(car =>
        car.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= Number(filters.maxPrice));
    }

    if (filters.fuel) {
      filtered = filtered.filter(car => car.fuel === filters.fuel);
    }

    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleAddCar = async (carData) => {
    try {
      const response = await axios.post(`${API_URL}/cars`, carData);
      setCars([response.data, ...cars]);
      setShowForm(false);
      alert('Annonce ajoutée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la voiture:', error);
      alert('Échec de l\'ajout de l\'annonce');
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <section className="hero">
          <div className="container">
            <h1>Trouvez Votre Voiture Idéale en Afrique</h1>
            <p>Parcourez des milliers de véhicules de qualité auprès de concessionnaires de confiance</p>
          </div>
        </section>

        <section className="search-section">
          <div className="container">
            <SearchBar filters={filters} setFilters={setFilters} />
            <button
              className="btn-add-listing"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Annuler' : '+ Ajouter Votre Annonce'}
            </button>
          </div>
        </section>

        {showForm && (
          <section className="form-section">
            <div className="container">
              <CarForm onSubmit={handleAddCar} onCancel={() => setShowForm(false)} />
            </div>
          </section>
        )}

        <section className="results-section">
          <div className="container">
            <div className="results-header">
              <h2>Voitures Disponibles</h2>
              <p>{filteredCars.length} {filteredCars.length === 1 ? 'voiture trouvée' : 'voitures trouvées'}</p>
            </div>

            {loading ? (
              <div className="loading">Chargement des voitures...</div>
            ) : (
              <CarList cars={filteredCars} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
