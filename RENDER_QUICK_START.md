# Render Deployment - Quick Start (5 Minutes)

## TL;DR - Just the commands & links you need

### 1. Sign up on Render
https://render.com (GitHub login recommended)

### 2. Create MongoDB Atlas (free tier M0)
https://www.mongodb.com/cloud/atlas
- Get connection string: `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/civicpulse?...`

### 3. Deploy Backend on Render

**New Web Service** → Select your GitHub repo → Fill:

```
Name: civicpulse-backend
Root Directory: backend
Environment: Node
Build Command: npm install
Start Command: npm start
```

**Environment Variables:**
```
MONGO_URI=mongodb+srv://...your-connection-string...
PORT=5000
JWT_SECRET=super-secret-change-this-12345
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
GROQ_API_KEY=your-groq-key-from-groq.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-secret
FRONTEND_URL=https://civicpulse-frontend.onrender.com
NODE_ENV=production
```

→ **Deploy** (wait 2-3 min)

Your backend URL: `https://civicpulse-backend.onrender.com`

---

### 4. Deploy Frontend on Render

**New Static Site** → Select your GitHub repo → Fill:

```
Name: civicpulse-frontend
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

**Environment Variables:**
```
VITE_API_URL=https://civicpulse-backend.onrender.com
```

→ **Deploy** (wait 2-5 min)

Your frontend URL: `https://civicpulse-frontend.onrender.com`

---

### 5. Test
- Open: https://civicpulse-frontend.onrender.com
- Register → Login → Create complaint → Check image verification

---

## Common Fixes

**CORS Error?** → Check backend has `FRONTEND_URL` env var set correctly

**API Timeout?** → Free tier is slow (30s+ cold start). Just wait, it'll work.

**Upload fails?** → Verify Cloudinary keys in backend env vars

---

## Full Guide
See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed step-by-step with screenshots

## Live URLs Once Deployed
- **Frontend**: https://civicpulse-frontend.onrender.com ← Share this
- **Backend**: https://civicpulse-backend.onrender.com (API only)
