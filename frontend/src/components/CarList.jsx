import CarCard from './CarCard'
import './CarList.css'

function CarList({ cars }) {
  if (cars.length === 0) {
    return (
      <div className="no-results">
        <h3>Aucune voiture trouvée</h3>
        <p>Essayez d'ajuster vos filtres de recherche</p>
      </div>
    )
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarCard key={car._id || car.id} car={car} />
      ))}
    </div>
  )
}

export default CarList
