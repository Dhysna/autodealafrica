import CarCard from './CarCard'
import './CarList.css'

function CarList({ cars }) {
  if (cars.length === 0) {
    return (
      <div className="no-results">
        <h3>No cars found</h3>
        <p>Try adjusting your search filters</p>
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
