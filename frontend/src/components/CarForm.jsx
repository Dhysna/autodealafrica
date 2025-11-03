import { useState } from 'react'
import './CarForm.css'

function CarForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    fuel: 'Petrol',
    transmission: 'Manual',
    color: '',
    description: '',
    location: '',
    sellerName: '',
    sellerPhone: '',
    sellerEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="car-form-container">
      <h2>Add Your Car Listing</h2>
      <form onSubmit={handleSubmit} className="car-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Brand *</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              placeholder="e.g., Toyota"
            />
          </div>

          <div className="form-group">
            <label>Model *</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              placeholder="e.g., Camry"
            />
          </div>

          <div className="form-group">
            <label>Year *</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear() + 1}
            />
          </div>

          <div className="form-group">
            <label>Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="e.g., 25000"
            />
          </div>

          <div className="form-group">
            <label>Mileage (km) *</label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              required
              min="0"
              placeholder="e.g., 15000"
            />
          </div>

          <div className="form-group">
            <label>Fuel Type *</label>
            <select name="fuel" value={formData.fuel} onChange={handleChange} required>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Gas">Gas</option>
            </select>
          </div>

          <div className="form-group">
            <label>Transmission *</label>
            <select name="transmission" value={formData.transmission} onChange={handleChange} required>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Silver"
            />
          </div>

          <div className="form-group full-width">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Lagos, Nigeria"
            />
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell buyers about your car..."
            />
          </div>

          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="sellerPhone"
              value={formData.sellerPhone}
              onChange={handleChange}
              required
              placeholder="+234 123 456 7890"
            />
          </div>

          <div className="form-group full-width">
            <label>Email</label>
            <input
              type="email"
              name="sellerEmail"
              value={formData.sellerEmail}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  )
}

export default CarForm
