# Deploy CivicPulse on Render - Step-by-Step Guide

This guide walks you through deploying the full CivicPulse stack (backend + frontend) on Render with a live public URL.

## Prerequisites

- [Render Account](https://render.com) (free tier available)
- GitHub repository with CivicPulse code pushed
- All required environment variables documented
- MongoDB Atlas account (or use MongoDB provider)

---

## Step 1: Prepare Your Repository

Ensure your GitHub repository has:
1. `/backend` folder with `package.json` and `src/` directory
2. `/frontend` folder with `package.json` and `src/` directory
3. `.gitignore` excludes `node_modules`, `.env`, and build artifacts

Push all code to GitHub:
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

---

## Step 2: Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 tier)
3. In **Database Access**, create a user with a strong password
4. In **Network Access**, add `0.0.0.0/0` (allow from anywhere)
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
   Replace `<username>`, `<password>`, and `<dbname>`

---

## Step 3: Create Backend Service on Render

### 3.1 Sign up / Log in to Render
Go to [render.com](https://render.com) and sign in with GitHub.

### 3.2 Create a New Web Service
1. Click **New +** → Select **Web Service**
2. Select your GitHub repository containing CivicPulse
3. Click **Connect** next to the repository

### 3.3 Configure Backend Service
Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `civicpulse-backend` |
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free (or Starter if you need more resources) |

### 3.4 Add Environment Variables

Click **Environment** and add these variables:

```
MONGO_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/civicpulse?retryWrites=true&w=majority
PORT = 5000
JWT_SECRET = your-super-secret-jwt-key-change-this
ACCESS_TOKEN_SECRET = your-access-token-secret-change-this
REFRESH_TOKEN_SECRET = your-refresh-token-secret-change-this
GROQ_API_KEY = your-groq-api-key-from-groq.com
CLOUDINARY_CLOUD_NAME = your-cloudinary-cloud-name
CLOUDINARY_API_KEY = your-cloudinary-api-key
CLOUDINARY_API_SECRET = your-cloudinary-secret
FRONTEND_URL = https://civicpulse-frontend.onrender.com
NODE_ENV = production
```

**Important:** Replace placeholder values with your actual credentials.

### 3.5 Deploy Backend

Click **Create Web Service**. Render will build and deploy. Wait 2-3 minutes for the build to complete.

**Your backend URL will be:** `https://civicpulse-backend.onrender.com`

---

## Step 4: Update Backend for CORS

Once backend is deployed, update `backend/src/app.js` to include your Render frontend URL in CORS allowedOrigins:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://civicpulse-frontend.onrender.com' // Add this
];
```

Commit and push this change:
```bash
git add backend/src/app.js
git commit -m "Update CORS for Render deployment"
git push origin main
```

Render will auto-deploy the changes.

---

## Step 5: Create Frontend Static Site on Render

### 5.1 Create a New Static Site
1. In Render dashboard, click **New +** → Select **Static Site**
2. Select your GitHub repository
3. Click **Connect**

### 5.2 Configure Frontend Service
Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `civicpulse-frontend` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 5.3 Add Environment Variables

Click **Environment** and add:

```
VITE_API_URL = https://civicpulse-backend.onrender.com
```

### 5.4 Deploy Frontend

Click **Create Static Site**. Render will build and deploy (2-5 minutes).

**Your frontend URL will be:** `https://civicpulse-frontend.onrender.com`

---

## Step 6: Verify Deployment

### 6.1 Test Backend

Open your browser and visit:
```
https://civicpulse-backend.onrender.com/api/health
```

You should see a response (if you have a health endpoint) or a 404 (if not, but that's OK—it means the backend is running).

### 6.2 Test Frontend

Open your browser and visit:
```
https://civicpulse-frontend.onrender.com
```

You should see the CivicPulse login page.

### 6.3 Test End-to-End Login

1. Click **Register**
2. Create a test account
3. Log in
4. Try submitting a complaint with an image
5. Verify the AI image verification works (check browser console for API calls)

---

## Step 7: Fix Common Issues

### Issue: "CORS error" or "API request fails"

**Solution:** 
- Verify `VITE_API_URL` is set to your backend URL (without trailing slash)
- Verify `FRONTEND_URL` is set in backend environment variables
- Ensure backend `app.js` includes your Render frontend URL in `allowedOrigins`

### Issue: "Cannot connect to MongoDB"

**Solution:**
- Verify `MONGO_URI` is correctly copied from MongoDB Atlas
- Check MongoDB Atlas **Network Access** includes `0.0.0.0/0`
- Verify credentials in connection string are URL-encoded (if your password has special characters)

### Issue: "Cloudinary upload fails" or "Image verification fails"

**Solution:**
- Double-check `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Double-check `GROQ_API_KEY` from [console.groq.com](https://console.groq.com)
- Verify these are set in backend environment variables

### Issue: "Slow initial load" (30+ seconds)

**Solution:**
- This is normal on Render's free tier (cold starts)
- Free tier services spin down after 15 minutes of inactivity
- Upgrade to **Starter** ($7/month) for always-on services

---

## Step 8: Monitoring & Logs

### View Backend Logs
1. Go to Render dashboard
2. Click **civicpulse-backend**
3. Click **Logs** tab to see real-time logs

### View Frontend Build Logs
1. Go to Render dashboard
2. Click **civicpulse-frontend**
3. Click **Deployments** to see build history and logs

---

## Step 9: Optional - Set Up Custom Domain

If you have a custom domain (e.g., `civicpulse.com`):

### 9.1 For Backend
1. In **civicpulse-backend** settings, click **Custom Domain**
2. Add `api.civicpulse.com`
3. Add CNAME record to your DNS provider: `CNAME: api.civicpulse.com → civicpulse-backend.onrender.com`

### 9.2 For Frontend
1. In **civicpulse-frontend** settings, click **Custom Domain**
2. Add `civicpulse.com`
3. Add CNAME record to your DNS provider: `CNAME: civicpulse.com → civicpulse-frontend.onrender.com`

### 9.3 Update Frontend Environment Variables
Update `VITE_API_URL` to your custom domain:
```
VITE_API_URL = https://api.civicpulse.com
```

---

## Step 10: Production Checklist

Before going live, verify:

- [ ] Backend `NODE_ENV` is set to `production`
- [ ] JWT secret is a strong, random string (not a default value)
- [ ] All sensitive keys (GROQ, Cloudinary, MongoDB) are set as environment variables (not hardcoded)
- [ ] CORS `allowedOrigins` includes your frontend URL
- [ ] Frontend `VITE_API_URL` points to backend domain without trailing slash
- [ ] MongoDB user has appropriate permissions for the database
- [ ] Test file uploads (image verification)
- [ ] Test complaint creation with and without GPS coordinates
- [ ] Test admin dashboard and user dashboard functionality

---

## Step 11: Auto-Deploy on Push

By default, Render automatically redeploys when you push to your main branch. 

To disable or configure:
1. Go to service settings
2. Click **Deploy**
3. Toggle **Auto-Deploy** on/off

---

## Live URLs

Once deployed:

**Frontend (User-facing):** `https://civicpulse-frontend.onrender.com`

**Backend API:** `https://civicpulse-backend.onrender.com`

Test the full workflow:
1. Register/login at frontend
2. Create a complaint with image
3. AI verification processes image via GROQ
4. Complaint appears in dashboard

---

## Troubleshooting & Support

| Problem | Solution |
|---------|----------|
| Deployment fails | Check build logs; verify all dependencies in package.json |
| App crashes after deploy | Check runtime logs; verify environment variables |
| Slow performance | Upgrade from free tier; Render free tier has cold starts |
| Database connection error | Verify MONGO_URI and MongoDB Atlas network access |
| CORS errors | Ensure FRONTEND_URL in backend env vars matches frontend URL |

For more help:
- [Render Docs](https://render.com/docs)
- [Render Support](https://render.com/support)

---

## Cost Breakdown (as of May 2026)

| Service | Free Tier | Starter |
|---------|-----------|---------|
| Web Service (Backend) | $0 (hibernates after 15 min) | $7/month |
| Static Site (Frontend) | $0 (always on) | N/A (static is free) |
| **Total** | **$0/month** | **$7/month** |

Free tier is suitable for testing. For production, upgrade to Starter ($7/month/service).

---

## Next Steps

1. Deploy on Render following this guide
2. Test all features (login, complaint creation, image verification, admin dashboard)
3. Share your live URL: `https://civicpulse-frontend.onrender.com`
4. Monitor logs for any issues
5. Consider custom domain setup for branding

🎉 **Your CivicPulse app is now live on the internet!**
