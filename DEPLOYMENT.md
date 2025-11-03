# Deployment Guide

This guide will help you deploy Autodealafrica to various hosting platforms.

## Table of Contents

1. [Frontend Deployment](#frontend-deployment)
2. [Backend Deployment](#backend-deployment)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Build the frontend:**
```bash
cd frontend
npm run build
```

3. **Deploy:**
```bash
vercel
```

4. **Set environment variables in Vercel dashboard:**
   - `VITE_API_URL` = your backend API URL

### Option 2: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build and deploy:**
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

3. **Set environment variables in Netlify dashboard:**
   - `VITE_API_URL` = your backend API URL

### Option 3: GitHub Pages

1. **Update `vite.config.js`:**
```javascript
export default defineConfig({
  base: '/autodealafrica/',
  // ... rest of config
})
```

2. **Build and deploy:**
```bash
cd frontend
npm run build
# Copy dist folder to gh-pages branch
```

---

## Backend Deployment

### Option 1: Railway (Recommended - Free tier available)

1. **Create a Railway account:** https://railway.app/

2. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

3. **Initialize Railway project:**
```bash
cd backend
railway login
railway init
```

4. **Deploy:**
```bash
railway up
```

5. **Set environment variables in Railway dashboard:**
   - `PORT` = 5000
   - `MONGODB_URI` = your MongoDB connection string
   - `NODE_ENV` = production

### Option 2: Render

1. **Create a Render account:** https://render.com/

2. **Create a new Web Service**

3. **Connect your GitHub repository**

4. **Configure:**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

5. **Set environment variables in Render dashboard**

### Option 3: Heroku

1. **Install Heroku CLI:**
```bash
npm install -g heroku
```

2. **Login and create app:**
```bash
heroku login
cd backend
heroku create autodealafrica-api
```

3. **Deploy:**
```bash
git push heroku main
```

4. **Set environment variables:**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production
```

---

## Database Setup

### MongoDB Atlas (Free tier available)

1. **Create account:** https://www.mongodb.com/cloud/atlas/register

2. **Create a new cluster:**
   - Choose the free tier (M0)
   - Select your preferred region

3. **Create database user:**
   - Go to "Database Access"
   - Add new database user
   - Save username and password

4. **Whitelist IP addresses:**
   - Go to "Network Access"
   - Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development

5. **Get connection string:**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

Example connection string:
```
mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/autodealafrica?retryWrites=true&w=majority
```

---

## Environment Variables

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, update with your deployed backend URL:
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/autodealafrica
NODE_ENV=development
```

For production:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/autodealafrica?retryWrites=true&w=majority
NODE_ENV=production
```

---

## Complete Deployment Checklist

### Before Deployment

- [ ] Test the application locally
- [ ] Ensure all dependencies are listed in package.json
- [ ] Create .env.example files (without sensitive data)
- [ ] Add .env to .gitignore
- [ ] Update API URLs for production
- [ ] Test with production database

### Frontend Deployment

- [ ] Build the frontend successfully
- [ ] Set VITE_API_URL environment variable
- [ ] Deploy to hosting service
- [ ] Test deployed frontend

### Backend Deployment

- [ ] Deploy backend to hosting service
- [ ] Set all environment variables
- [ ] Ensure MongoDB is accessible
- [ ] Test API endpoints
- [ ] Enable CORS for frontend domain

### Database

- [ ] Create MongoDB Atlas cluster
- [ ] Create database user
- [ ] Whitelist IP addresses
- [ ] Get connection string
- [ ] Update MONGODB_URI in backend

### Post-Deployment

- [ ] Test full application flow
- [ ] Test creating new listings
- [ ] Test search and filters
- [ ] Check for console errors
- [ ] Verify API responses
- [ ] Test on mobile devices
- [ ] Set up monitoring (optional)

---

## Troubleshooting

### Frontend Issues

**Problem:** API requests fail with CORS error
- **Solution:** Ensure backend CORS is configured correctly and includes your frontend domain

**Problem:** Environment variables not working
- **Solution:** Restart the dev server after changing .env file

### Backend Issues

**Problem:** MongoDB connection fails
- **Solution:** Check connection string, ensure IP is whitelisted, verify credentials

**Problem:** Port already in use
- **Solution:** Change PORT in .env or kill the process using the port

### Database Issues

**Problem:** Can't connect to MongoDB Atlas
- **Solution:** Verify IP whitelist, check connection string, ensure correct password

---

## Monitoring & Maintenance

### Recommended Tools

1. **Uptime Monitoring:** UptimeRobot, Pingdom
2. **Error Tracking:** Sentry
3. **Analytics:** Google Analytics, Plausible
4. **Logs:** Papertrail, Loggly

### Regular Maintenance

- Monitor application performance
- Check error logs regularly
- Update dependencies periodically
- Backup database regularly
- Monitor disk space and memory usage

---

## Quick Deploy Commands

### Deploy Everything (after initial setup)

```bash
# Frontend
cd frontend && npm run build && vercel --prod

# Backend
cd backend && railway up

# Or using git (if configured)
git push heroku main
```

---

## Need Help?

If you encounter issues during deployment:

1. Check the logs of your hosting service
2. Verify all environment variables are set correctly
3. Test API endpoints using Postman or curl
4. Ensure database connection is working
5. Check CORS configuration

For more help, create an issue in the GitHub repository.
