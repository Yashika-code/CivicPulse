# CivicPulse

CivicPulse is a full-stack civic issue reporting platform with a Node.js/Express backend and a React/Vite frontend.

## What It Does

- Citizens can register, log in, and submit complaints with images.
- Officers can review assigned complaints and update status.
- Admins can create officers, assign complaints, and view platform-wide complaint data.
- The complaint flow uses AI for image verification, complaint relevance checks, and generated complaint descriptions.
- If browser geolocation is denied, users can still type the location manually.

## AI Features

- Image verification checks whether uploaded images match the complaint text and reported location.
- Complaint descriptions can be generated or refined by the AI flow after successful verification.
- AI configuration is optional, but the backend supports GROQ-based image and text analysis when the related environment variables are set.
- If AI verification is unavailable, the backend can return a validation error instead of silently accepting the complaint.

## Project Structure

- `backend/` - Express API, MongoDB models, AI services, Socket.IO, Cloudinary uploads.
- `frontend/` - React app built with Vite, React Router, Axios, Leaflet, and Tailwind CSS.
- `SETUP.md` - original setup notes.
- `gamma_presentation_prompt.txt` - project prompt/artifact.

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB
- Cloudinary account and API credentials
- Optional: GROQ API credentials for AI image verification and description generation

## Setup

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Environment Variables

Create `backend/.env` with values similar to these:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
GROQ_API_KEY=<optional>
GROQ_MODEL=<optional>
GROQ_VISION_MODEL=<optional>
```

The AI flow is used in the complaint pipeline for:

- validating uploaded complaint images
- checking complaint relevance against the submitted text
- generating or improving the complaint description
- producing AI preview metadata such as confidence, summary, and suggested action

Create `frontend/.env` if you need to override the API base URL:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:5000` by default.

## Useful Scripts

Backend:

- `npm run dev` - start the API with nodemon
- `npm start` - start the API in production mode

Frontend:

- `npm run dev` - start the Vite dev server
- `npm run build` - build the frontend for production
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint

## Main API Routes

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`

Complaints:

- `POST /api/complaints/validate-image`
- `POST /api/complaints`
- `GET /api/complaints/my`
- `GET /api/complaints/assigned`
- `PUT /api/complaints/:id/status`

Admin:

- `POST /api/admin/create-officer`
- `POST /api/admin/assign-officer`
- `GET /api/admin/complaints`
- `GET /api/admin/officers`

## Notes

- The backend uses CORS with `FRONTEND_URL` plus common localhost Vite ports.
- Complaint images are uploaded with Multer and stored in Cloudinary.
- JWT access tokens are sent in the `Authorization` header; refresh tokens are handled with cookies.
- If browser geolocation is denied, the complaint form allows manual location entry.

## Seed Data

The backend includes a seed script at `backend/src/seedAdmin.js` for creating initial admin/officer accounts.

## Troubleshooting

- If the frontend cannot reach the backend, verify `VITE_API_URL` and the backend port.
- If login or complaint requests fail, confirm that the `.env` values are set and MongoDB is reachable.
- If AI validation is unavailable, check `GROQ_API_KEY` and related AI settings.
