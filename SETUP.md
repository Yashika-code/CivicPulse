# CivicPulse - Full Stack Installation & Running Guide

## Project Structure

- **Backend**: Express.js + MongoDB + JWT
- **Frontend**: React + Vite + Tailwind CSS
- **Authentication**: JWT with Access & Refresh tokens

## Prerequisites

- Node.js >= 16
- MongoDB connection string (already configured in `.env`)
- npm or yarn

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
The `.env` file is already configured with:
- PORT: 5000
- FRONTEND_URL: http://localhost:5173
- MongoDB connection string
- JWT secrets
- Cloudinary secrets

### 3. Start Backend Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Variables
The `.env` file is configured with:
- VITE_API_URL: http://localhost:5000/api

### 3. Start Frontend Dev Server
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Integration Overview

### Key APIs Connected

#### Authentication
- `POST /api/auth/register` - Register new citizen
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token

#### Complaints (Citizen)
- `POST /api/complaints` - Create new complaint (with image upload)
- `GET /api/complaints/my` - Get user's complaints
- `PUT /api/complaints/:id/status` - Update complaint status (officer only)

#### Complaints (Officer)
- `GET /api/complaints/assigned` - Get officer's assigned complaints

#### Admin
- `GET /api/admin/complaints` - Get all complaints
- `GET /api/admin/officers` - Get all officers
- `POST /api/admin/create-officer` - Create new officer
- `POST /api/admin/assign-officer` - Assign officer to complaint

### Authentication Flow

1. User registers/login → gets `accessToken` & `refreshToken`
2. `accessToken` stored in localStorage
3. `refreshToken` stored in httpOnly cookie (sent with every request)
4. axios interceptors automatically:
   - Attach token to requests
   - Refresh token on 401 response
   - Logout on refresh failure

## User Roles

1. **Citizen**
   - Raise complaints
   - View their complaints
   - Track complaint status
   - Give feedback

2. **Officer**
   - View assigned complaints
   - Update complaint status
   - Track resolved complaints

3. **Admin**
   - Manage all complaints
   - Manage officers
   - Create departments
   - View system reports

## Features Implemented

✅ User Authentication (Login/Register)
✅ Role-based Access Control
✅ Complaint CRUD operations
✅ Image upload via Cloudinary
✅ Complaint status tracking
✅ Officer assignment
✅ Protected routes
✅ Token refresh mechanism
✅ Responsive UI with Tailwind CSS
✅ API error handling with interceptors
✅ Role-based dashboards

## Testing the Application

### 1. Register a New Citizen
- Navigate to http://localhost:5173/register
- Fill in name, email, password
- Submit to create account

### 2. Login
- Go to http://localhost:5173/
- Enter credentials
- Get redirected to citizen dashboard

### 3. Create Complaint
- Click "Raise Complaint"
- Fill form with category, location, description
- Upload images (optional)
- Submit

### 4. View Complaints
- Click "My Complaints"
- See all your submitted complaints
- Click on complaint to view details

## Troubleshooting

### Backend Port Already in Use
```bash
# Change PORT in backend/.env or kill process on port 5000
```

### CORS Errors
- Ensure FRONTEND_URL in backend/.env matches your frontend URL
- Default: http://localhost:5173

### API Connection Failed
- Verify backend is running on http://localhost:5000
- Check VITE_API_URL in frontend/.env

### Database Connection Issues
- Verify MONGO_URI in backend/.env is correct
- Check internet connection for MongoDB Atlas

## Production Deployment

### Backend
1. Set environment variables
2. Run: `npm run start`
3. Deploy to Heroku, Railway, or similar

### Frontend
1. Build: `npm run build`
2. Deploy `dist/` folder to Netlify, Vercel, or similar
3. Update VITE_API_URL to production API URL

