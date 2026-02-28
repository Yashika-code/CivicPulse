# CivicPulse Backend

This is the backend server for the CivicPulse application, built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Complaint management system
- Admin and officer management
- File upload support with Cloudinary
- PDF report generation

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

Create a `.env` file in the backend root directory with the following variables:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb+srv://your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Seeding Admin and Officer

To create the initial admin and officer accounts, run the seed script:

```bash
node src/seedAdmin.js
```

This will create:
- **Super Admin**: admin@civicpulse.com / Admin@123
- **Test Officer**: officer@civicpulse.com / Officer@123

**Note**: The script will only create these accounts if they don't already exist.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new citizen
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token

### Admin
- `POST /api/admin/create-officer` - Create new officer (Admin only)
- `POST /api/admin/assign-officer` - Assign officer to complaint (Admin only)
- `GET /api/admin/complaints` - Get all complaints (Admin only)
- `GET /api/admin/officers` - Get all officers (Admin only)

### Complaints
- `POST /api/complaints` - Create new complaint
- `GET /api/complaints` - Get user's complaints
- `GET /api/complaints/:id` - Get complaint by ID
- `PUT /api/complaints/:id` - Update complaint status
- `DELETE /api/complaints/:id` - Delete complaint

### Departments
- `POST /api/departments` - Create new department (Admin only)
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

## Database Models

- **User**: Stores user information (citizens, officers, admins)
- **Complaint**: Stores complaint details and status
- **Department**: Stores department information

## Middleware

- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control
- **File Upload**: Multer for handling file uploads
- **Error Handling**: Global error handler

## Security

- Password hashing with bcrypt
- JWT authentication with refresh tokens
- CORS configuration
- Input validation and sanitization

## Dependencies

- **Express**: Web framework
- **Mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **Cloudinary**: File storage
- **Multer**: File upload handling
- **PDFKit**: PDF generation