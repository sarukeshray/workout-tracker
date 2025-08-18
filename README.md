# Workout Tracker with Backend

A comprehensive strength training workout tracker with MongoDB backend and user authentication.

## Features

- **User Authentication**: Register/Login with JWT tokens
- **Workout Tracking**: Track sets, reps, weight, and notes
- **Exercise Database**: 50+ exercises across 8 categories
- **Progress Visualization**: Charts showing performance over time
- **Favorites System**: Mark frequently used exercises
- **Offline Support**: Local storage fallback when API is unavailable

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Database will be created automatically at `mongodb://localhost:27017/workout-tracker`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `.env` file with your connection string

### 3. Environment Configuration

Create/update `.env` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/workout-tracker
# or for Atlas: mongodb+srv://username:password@cluster.mongodb.net/workout-tracker

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Start the Application

#### Development Mode (both frontend and backend)

Terminal 1 - Start Backend:
```bash
npm run server
```

Terminal 2 - Start Frontend:
```bash
npm run dev
```

#### Or use nodemon for backend auto-restart:
```bash
npm run dev:server
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Workouts
- `GET /api/workouts` - Get user's workouts
- `POST /api/workouts` - Create new workout
- `DELETE /api/workouts/:id` - Delete workout
- `GET /api/workouts/exercise/:exerciseId` - Get workouts by exercise

### Favorites
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites/toggle` - Toggle exercise favorite

## MongoDB Connection Guide

### Local MongoDB Setup

1. **Install MongoDB**:
   - Windows: Download from MongoDB website
   - Mac: `brew install mongodb-community`
   - Linux: Follow MongoDB installation guide

2. **Start MongoDB**:
   ```bash
   # Mac/Linux
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   ```

3. **Verify Connection**:
   ```bash
   mongosh
   ```

### MongoDB Atlas Setup

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas)

2. **Create Cluster**:
   - Choose free tier (M0)
   - Select region closest to you
   - Create cluster

3. **Setup Database Access**:
   - Go to Database Access
   - Add new database user
   - Choose password authentication
   - Give read/write access

4. **Setup Network Access**:
   - Go to Network Access
   - Add IP address (0.0.0.0/0 for development)

5. **Get Connection String**:
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password

6. **Update .env**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/workout-tracker
   ```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

### Workouts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  exerciseId: String,
  exerciseName: String,
  category: String,
  sets: [{
    reps: Number,
    weight: Number
  }],
  notes: String,
  date: Date,
  createdAt: Date
}
```

### Favorites Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  exerciseId: String,
  createdAt: Date
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation
- CORS configuration
- Environment variables for secrets

## Offline Support

The app includes offline functionality:
- Local storage fallback when API is unavailable
- Automatic sync when connection is restored
- Works without internet after initial load

## Production Deployment

1. **Environment Variables**:
   - Change JWT_SECRET to a secure random string
   - Use production MongoDB URI
   - Set NODE_ENV=production

2. **Build Frontend**:
   ```bash
   npm run build
   ```

3. **Deploy Backend**:
   - Use services like Heroku, Railway, or DigitalOcean
   - Ensure MongoDB Atlas is accessible

4. **Update API URL**:
   - Change API_BASE_URL in `src/utils/api.ts` to production URL

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**:
   - Check if MongoDB is running
   - Verify connection string in .env
   - Check network access for Atlas

2. **JWT Token Issues**:
   - Clear localStorage and login again
   - Check JWT_SECRET in .env

3. **CORS Errors**:
   - Ensure backend is running on port 5000
   - Check CORS configuration in server.js

4. **API Calls Failing**:
   - Check if backend server is running
   - Verify API endpoints in browser/Postman
   - Check browser console for errors

### Development Tips

- Use MongoDB Compass for database visualization
- Use Postman to test API endpoints
- Check browser Network tab for API call debugging
- Monitor server logs for backend issues