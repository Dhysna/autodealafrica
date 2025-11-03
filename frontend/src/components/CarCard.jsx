import './CarCard.css'

function CarCard({ car }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('fr-FR').format(mileage) + ' km';
  };

  // Traduire les valeurs en français
  const translateFuel = (fuel) => {
    const translations = {
      'Petrol': 'Essence',
      'Diesel': 'Diesel',
      'Electric': 'Électrique',
      'Hybrid': 'Hybride',
      'Gas': 'Gaz'
    };
    return translations[fuel] || fuel;
  };

  const translateTransmission = (transmission) => {
    return transmission === 'Automatic' ? 'Automatique' : 'Manuelle';
  };

  return (
    <div className="car-card">
      {car.featured && <div className="featured-badge">En Vedette</div>}

      <div className="car-image">
        <div className="placeholder-image">
          <span className="car-emoji">🚗</span>
          <p>{car.brand} {car.model}</p>
        </div>
      </div>

      <div className="car-info">
        <h3 className="car-title">{car.brand} {car.model}</h3>
        <p className="car-year">{car.year}</p>

        <div className="car-details">
          <div className="detail-item">
            <span className="detail-icon">⛽</span>
            <span>{translateFuel(car.fuel)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">⚙️</span>
            <span>{translateTransmission(car.transmission)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">🛣️</span>
            <span>{formatMileage(car.mileage)}</span>
          </div>
          {car.color && (
            <div className="detail-item">
              <span className="detail-icon">🎨</span>
              <span>{car.color}</span>
            </div>
          )}
        </div>

        {car.description && (
          <p className="car-description">{car.description}</p>
        )}

        <div className="car-location">
          <span className="detail-icon">📍</span>
          <span>{car.location}</span>
        </div>

        <div className="car-footer">
          <div className="car-price">{formatPrice(car.price)}</div>
          <button className="btn-contact">
            Contacter le Vendeur
          </button>
        </div>

        <div className="seller-info">
          <p><strong>{car.sellerName}</strong></p>
          <p>{car.sellerPhone}</p>
        </div>
      </div>
    </div>
  )
}

export default CarCard
