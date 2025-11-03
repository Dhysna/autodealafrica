const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Sample data for demo (if no database)
let sampleCars = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 25000,
    mileage: 15000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    color: 'Silver',
    description: 'Excellent condition, one owner',
    location: 'Lagos, Nigeria',
    sellerName: 'John Doe',
    sellerPhone: '+234 123 456 7890',
    sellerEmail: 'john@example.com',
    images: [],
    featured: true,
    status: 'available'
  },
  {
    id: '2',
    brand: 'Honda',
    model: 'Accord',
    year: 2021,
    price: 22000,
    mileage: 20000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    color: 'Black',
    description: 'Well maintained, full service history',
    location: 'Abuja, Nigeria',
    sellerName: 'Jane Smith',
    sellerPhone: '+234 987 654 3210',
    sellerEmail: 'jane@example.com',
    images: [],
    featured: false,
    status: 'available'
  },
  {
    id: '3',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: 45000,
    mileage: 5000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    color: 'White',
    description: 'Luxury sedan, premium features',
    location: 'Port Harcourt, Nigeria',
    sellerName: 'Mike Johnson',
    sellerPhone: '+234 555 123 4567',
    sellerEmail: 'mike@example.com',
    images: [],
    featured: true,
    status: 'available'
  }
];

// GET all cars with filters
router.get('/', async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, minYear, maxYear, fuel, transmission, location, search } = req.query;

    // Check if database is connected
    if (require('mongoose').connection.readyState === 1) {
      let query = {};

      if (brand) query.brand = new RegExp(brand, 'i');
      if (fuel) query.fuel = fuel;
      if (transmission) query.transmission = transmission;
      if (location) query.location = new RegExp(location, 'i');
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      if (minYear || maxYear) {
        query.year = {};
        if (minYear) query.year.$gte = Number(minYear);
        if (maxYear) query.year.$lte = Number(maxYear);
      }
      if (search) {
        query.$or = [
          { brand: new RegExp(search, 'i') },
          { model: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') }
        ];
      }

      const cars = await Car.find(query).sort({ createdAt: -1 });
      res.json(cars);
    } else {
      // Use sample data if no database
      let filtered = sampleCars;

      if (brand) filtered = filtered.filter(car => car.brand.toLowerCase().includes(brand.toLowerCase()));
      if (fuel) filtered = filtered.filter(car => car.fuel === fuel);
      if (transmission) filtered = filtered.filter(car => car.transmission === transmission);
      if (search) {
        filtered = filtered.filter(car =>
          car.brand.toLowerCase().includes(search.toLowerCase()) ||
          car.model.toLowerCase().includes(search.toLowerCase()) ||
          car.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      res.json(filtered);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single car by ID
router.get('/:id', async (req, res) => {
  try {
    if (require('mongoose').connection.readyState === 1) {
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).json({ error: 'Car not found' });
      res.json(car);
    } else {
      const car = sampleCars.find(c => c.id === req.params.id);
      if (!car) return res.status(404).json({ error: 'Car not found' });
      res.json(car);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new car listing
router.post('/', async (req, res) => {
  try {
    if (require('mongoose').connection.readyState === 1) {
      const car = new Car(req.body);
      await car.save();
      res.status(201).json(car);
    } else {
      const newCar = {
        id: String(sampleCars.length + 1),
        ...req.body,
        featured: false,
        status: 'available'
      };
      sampleCars.push(newCar);
      res.status(201).json(newCar);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update car listing
router.put('/:id', async (req, res) => {
  try {
    if (require('mongoose').connection.readyState === 1) {
      const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!car) return res.status(404).json({ error: 'Car not found' });
      res.json(car);
    } else {
      const index = sampleCars.findIndex(c => c.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Car not found' });
      sampleCars[index] = { ...sampleCars[index], ...req.body };
      res.json(sampleCars[index]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE car listing
router.delete('/:id', async (req, res) => {
  try {
    if (require('mongoose').connection.readyState === 1) {
      const car = await Car.findByIdAndDelete(req.params.id);
      if (!car) return res.status(404).json({ error: 'Car not found' });
      res.json({ message: 'Car deleted successfully' });
    } else {
      const index = sampleCars.findIndex(c => c.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: 'Car not found' });
      sampleCars.splice(index, 1);
      res.json({ message: 'Car deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
