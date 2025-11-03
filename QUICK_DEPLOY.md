# Quick Deploy Guide - Autodealafrica

Follow these simple steps to deploy your application in minutes!

## 🎯 Deployment Plan

We'll use these FREE services:
- **MongoDB Atlas** - Database (Free tier: 512MB)
- **Render** - Backend API (Free tier available)
- **Vercel** - Frontend (Free tier with unlimited bandwidth)

---

## Step 1: Push to GitHub (If not done)

```bash
cd C:\Users\HP\Desktop\autodealafrica

# Login to GitHub
gh auth login

# Create repo and push
gh repo create autodealafrica --public --source=. --remote=origin --push
```

---

## Step 2: Setup MongoDB Atlas (5 minutes)

### 2.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/Email
3. Choose FREE tier (M0)

### 2.2 Create Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select your closest region
4. Name it: `autodealafrica`
5. Click "Create"

### 2.3 Create Database User
1. Security → Database Access → Add New Database User
2. Username: `autodealer`
3. Password: (Generate a secure password - SAVE IT!)
4. Database User Privileges: Read and write to any database
5. Click "Add User"

### 2.4 Whitelist IPs
1. Security → Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
3. Click "Confirm"

### 2.5 Get Connection String
1. Go to Database → Connect
2. Choose "Connect your application"
3. Copy the connection string
4. It looks like: `mongodb+srv://autodealer:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<password>` with your actual password
6. Add database name at the end: `mongodb+srv://autodealer:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/autodealafrica?retryWrites=true&w=majority`

**SAVE THIS CONNECTION STRING!** You'll need it in Step 3.

---

## Step 3: Deploy Backend to Render (5 minutes)

### 3.1 Create Render Account
1. Go to https://render.com/
2. Sign up with GitHub (recommended)
3. Authorize Render to access your GitHub

### 3.2 Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `autodealafrica`
3. Configure:
   - **Name**: `autodealafrica-api`
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Region**: Choose closest to you
   - **Branch**: `master`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3.3 Add Environment Variables
Before clicking "Create Web Service", scroll down to "Environment Variables":

Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | (Paste your MongoDB connection string from Step 2.5) |

### 3.4 Deploy
1. Click "Create Web Service"
2. Wait 2-5 minutes for deployment
3. Once deployed, you'll see your API URL: `https://autodealafrica-api.onrender.com`
4. **SAVE THIS URL!**

### 3.5 Test Backend
Visit: `https://autodealafrica-api.onrender.com/api/health`

You should see:
```json
{
  "status": "OK",
  "timestamp": "...",
  "database": "connected"
}
```

---

## Step 4: Deploy Frontend to Vercel (3 minutes)

### 4.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 4.2 Login to Vercel

```bash
vercel login
```

Follow the email verification link.

### 4.3 Update Frontend Configuration

Before deploying, update the API URL:

```bash
cd C:\Users\HP\Desktop\autodealafrica\frontend
```

Create `.env.production`:

```env
VITE_API_URL=https://autodealafrica-api.onrender.com/api
```

(Replace with your actual Render URL from Step 3.4)

### 4.4 Deploy

```bash
cd C:\Users\HP\Desktop\autodealafrica\frontend
vercel --prod
```

Answer the prompts:
- Set up and deploy? **Y**
- Which scope? (Choose your account)
- Link to existing project? **N**
- What's your project's name? `autodealafrica`
- In which directory is your code located? `./`
- Want to override the settings? **N**

### 4.5 Get Your Live URL

After deployment completes, Vercel will show:
```
✅  Production: https://autodealafrica.vercel.app
```

**This is your live website!**

---

## Step 5: Configure CORS on Backend

1. Go back to Render Dashboard
2. Click on your `autodealafrica-api` service
3. Go to "Environment"
4. Add a new environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel URL (e.g., `https://autodealafrica.vercel.app`)
5. Click "Save Changes"
6. Your service will automatically redeploy

---

## Step 6: Test Your Live Application

1. Visit your Vercel URL: `https://autodealafrica.vercel.app`
2. You should see the homepage
3. Try searching for cars
4. Try adding a new car listing
5. All data is now stored in MongoDB Atlas!

---

## 🎉 Congratulations!

Your application is now LIVE and accessible worldwide!

### Your URLs:
- **Frontend**: `https://autodealafrica.vercel.app`
- **Backend API**: `https://autodealafrica-api.onrender.com`
- **Database**: MongoDB Atlas

### Share Your Project:
- GitHub: `https://github.com/YOUR_USERNAME/autodealafrica`
- Live Site: `https://autodealafrica.vercel.app`

---

## Troubleshooting

### Frontend shows "Loading..." forever
- Check if backend URL is correct in `.env.production`
- Verify backend is running: visit `https://YOUR-BACKEND-URL/api/health`
- Check browser console for errors (F12)

### Backend deployment failed
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Database connection error
- Verify IP whitelist includes 0.0.0.0/0
- Check MongoDB connection string password
- Ensure database user has read/write permissions

---

## Free Tier Limits

### MongoDB Atlas (Free M0)
- 512 MB storage
- Shared RAM
- Perfect for this project!

### Render (Free tier)
- 750 hours/month (always running)
- 512 MB RAM
- Automatic sleep after 15 min of inactivity
- Cold starts (~30 seconds)

### Vercel (Free tier)
- Unlimited bandwidth
- 100 GB bandwidth/month
- Automatic HTTPS
- Global CDN

---

## Next Steps

### Custom Domain (Optional)
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. Add to Vercel: Settings → Domains
3. Update DNS records

### Monitoring
- Render: View logs and metrics in dashboard
- Vercel: View analytics in dashboard
- MongoDB Atlas: View database metrics

### Updates
```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push

# Vercel will auto-deploy from GitHub
# Or manually: vercel --prod
```

---

**Need help?** Check the main README.md and DEPLOYMENT.md for more details!
