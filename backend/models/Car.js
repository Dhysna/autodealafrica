const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mileage: {
    type: Number,
    required: true,
    min: 0
  },
  fuel: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Gas'],
    default: 'Petrol'
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual'],
    default: 'Manual'
  },
  color: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  sellerName: {
    type: String,
    required: true,
    trim: true
  },
  sellerPhone: {
    type: String,
    required: true,
    trim: true
  },
  sellerEmail: {
    type: String,
    trim: true
  },
  images: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Indexes for better search performance
carSchema.index({ brand: 1, model: 1 });
carSchema.index({ price: 1 });
carSchema.index({ year: -1 });
carSchema.index({ location: 1 });

module.exports = mongoose.model('Car', carSchema);
