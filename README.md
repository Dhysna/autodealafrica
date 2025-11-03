# Autodealafrica 🚗

A modern car listing directory platform for buying and selling cars across Africa.

## Features

- 🔍 **Advanced Search & Filters** - Search by brand, model, price, fuel type, transmission
- 📝 **Easy Listing** - Add your car listings with detailed information
- 💼 **Dealer Directory** - Browse through quality vehicles from trusted dealers
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast & Lightweight** - Built with React and Express for optimal performance
- 🎨 **Modern UI** - Clean and intuitive user interface

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** (optional) - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

## Project Structure

```
autodealafrica/
├── backend/
│   ├── models/
│   │   └── Car.js
│   ├── routes/
│   │   └── cars.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CarList.jsx
│   │   │   ├── CarCard.jsx
│   │   │   ├── CarForm.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional, works with sample data without database)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd autodealafrica
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/autodealafrica
NODE_ENV=development
```

**Note:** If you don't have MongoDB installed, the app will work with sample data.

Start the backend server:

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The API will be available at `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

### Cars

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | Get all cars with optional filters |
| GET | `/api/cars/:id` | Get a single car by ID |
| POST | `/api/cars` | Create a new car listing |
| PUT | `/api/cars/:id` | Update a car listing |
| DELETE | `/api/cars/:id` | Delete a car listing |

### Query Parameters for GET /api/cars

- `search` - Search by brand, model, or description
- `brand` - Filter by brand
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `minYear` - Minimum year filter
- `maxYear` - Maximum year filter
- `fuel` - Filter by fuel type (Petrol, Diesel, Electric, Hybrid)
- `transmission` - Filter by transmission (Automatic, Manual)
- `location` - Filter by location

### Example Request

```bash
# Get all cars
curl http://localhost:5000/api/cars

# Search for Toyota cars
curl http://localhost:5000/api/cars?brand=Toyota

# Filter by price range
curl http://localhost:5000/api/cars?minPrice=20000&maxPrice=30000

# Create a new listing
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Toyota",
    "model": "Camry",
    "year": 2022,
    "price": 25000,
    "mileage": 15000,
    "fuel": "Petrol",
    "transmission": "Automatic",
    "color": "Silver",
    "description": "Excellent condition",
    "location": "Lagos, Nigeria",
    "sellerName": "John Doe",
    "sellerPhone": "+234 123 456 7890",
    "sellerEmail": "john@example.com"
  }'
```

## Usage

### Adding a Car Listing

1. Click the "Add Your Listing" button
2. Fill in the car details form
3. Click "Submit Listing"
4. Your car will appear in the listings

### Searching for Cars

1. Use the search bar to search by brand, model, or description
2. Apply filters for price range, fuel type, and transmission
3. Click "Reset" to clear all filters

### Viewing Car Details

Each car card displays:
- Brand and model
- Year
- Price
- Mileage
- Fuel type
- Transmission
- Color
- Location
- Seller information

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to your hosting service

3. Set environment variable:
```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend Deployment (Heroku/Railway/Render)

1. Ensure your backend has a `start` script in package.json
2. Set environment variables on your hosting platform
3. Deploy the backend directory

### Database Setup (MongoDB Atlas)

1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file

## Development

### Running Tests

```bash
# Backend tests (if configured)
cd backend
npm test

# Frontend tests (if configured)
cd frontend
npm test
```

### Code Style

This project follows standard JavaScript/React conventions:
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names
- Comment complex logic

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email info@autodealafrica.com or create an issue in the GitHub repository.

## Roadmap

- [ ] User authentication and authorization
- [ ] Image upload functionality
- [ ] Advanced filtering options
- [ ] Favorites/Wishlist feature
- [ ] Chat between buyers and sellers
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Mobile app

## Acknowledgments

- Built with React and Express
- Icons from Unicode emoji set
- Inspired by modern car listing platforms

---

**Made with ❤️ for the African automotive market**
