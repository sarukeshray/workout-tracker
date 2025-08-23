# Firebase Workout Tracker

A comprehensive strength training workout tracker with Firebase backend and user authentication.

## Features

- **Firebase Authentication**: Register/Login with email/password
- **Firestore Database**: Real-time data storage and synchronization
- **Workout Tracking**: Track sets, reps, weight, and notes
- **Exercise Database**: 50+ exercises across 8 categories
- **Progress Visualization**: Charts showing performance over time
- **Favorites System**: Mark frequently used exercises
- **Offline Support**: Local storage fallback when Firebase is unavailable

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Firebase SDK for authentication and database
- Context API for state management

### Backend
- Node.js with Express
- Firebase Admin SDK
- Firestore for data storage
- Firebase Authentication
- CORS enabled

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "workout-tracker")
4. Enable Google Analytics (optional)
5. Create project

#### Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save changes

#### Step 3: Create Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select location closest to you
5. Create database

#### Step 4: Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (</>)
4. Register app with nickname
5. Copy the config object

#### Step 5: Generate Service Account Key
1. Go to Project Settings → Service accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Keep this file secure (never commit to git)

### 3. Environment Configuration

Update `.env` file with your Firebase credentials:

```env
# Firebase Admin (Backend) - from service account JSON
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com

# Firebase Client (Frontend) - from web app config
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

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

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Firebase Collections Structure

### Users Collection (`users`)
```javascript
{
  uid: "firebase-user-id",
  email: "user@example.com",
  username: "username",
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

### Workouts Collection (`workouts`)
```javascript
{
  id: "auto-generated-id",
  userId: "firebase-user-id",
  exerciseId: "bench-press",
  exerciseName: "Bench Press",
  category: "chest",
  sets: [
    { reps: 10, weight: 80 },
    { reps: 8, weight: 85 }
  ],
  notes: "Good form, felt strong",
  date: "2024-01-01T00:00:00.000Z",
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

### Favorites Collection (`favorites`)
```javascript
{
  id: "auto-generated-id",
  userId: "firebase-user-id",
  exerciseId: "bench-press",
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Save additional user data after Firebase registration
- `GET /api/auth/me` - Get current user data

### Workouts
- `GET /api/workouts` - Get user's workouts
- `POST /api/workouts` - Create new workout
- `DELETE /api/workouts/:id` - Delete workout
- `GET /api/workouts/exercise/:exerciseId` - Get workouts by exercise

### Favorites
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites/toggle` - Toggle exercise favorite

## Firebase Security Rules

### Firestore Rules (for production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Workouts are user-specific
    match /workouts/{workoutId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Favorites are user-specific
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Security Features

- Firebase Authentication with email/password
- Firestore security rules for data protection
- Server-side token verification with Firebase Admin SDK
- User-specific data isolation
- Environment variables for sensitive configuration

## Offline Support

The app includes offline functionality:
- Local storage fallback when Firebase is unavailable
- Automatic sync when connection is restored
- Works without internet after initial authentication

## Production Deployment

1. **Update Firestore Rules**:
   - Change from "test mode" to production rules
   - Implement proper security rules (see above)

2. **Environment Variables**:
   - Use production Firebase project
   - Secure environment variable storage

3. **Build Frontend**:
   ```bash
   npm run build
   ```

4. **Deploy Backend**:
   - Use services like Vercel, Netlify Functions, or Google Cloud Functions
   - Ensure Firebase Admin SDK credentials are secure

## Troubleshooting

### Common Issues

1. **Firebase Connection Failed**:
   - Check Firebase project configuration
   - Verify API keys in .env file
   - Ensure Firestore database is created

2. **Authentication Issues**:
   - Verify Email/Password provider is enabled
   - Check Firebase Auth domain configuration
   - Clear browser cache and try again

3. **Permission Denied**:
   - Check Firestore security rules
   - Ensure user is properly authenticated
   - Verify user ID matches document ownership

4. **API Calls Failing**:
   - Check if backend server is running
   - Verify Firebase Admin SDK configuration
   - Check browser console for errors

### Development Tips

- Use Firebase Console to view data and debug
- Check browser Network tab for API call debugging
- Monitor server logs for backend issues
- Use Firebase Auth emulator for local development

## Firebase Advantages

- **Real-time Updates**: Data syncs across devices instantly
- **Scalability**: Automatically scales with your user base
- **Security**: Built-in authentication and security rules
- **Offline Support**: Built-in offline capabilities
- **No Server Management**: Serverless architecture
- **Analytics**: Built-in user analytics and crash reporting