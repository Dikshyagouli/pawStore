# Troubleshooting: Network Error on Sign Up

## Common Causes and Solutions

### 1. Backend Server Not Running
**Problem:** The frontend cannot connect to the backend API.

**Solution:**
1. Open a terminal in the `backend` folder
2. Make sure you have a `.env` file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ADMIN_KEY=your_admin_key_here
   ```
3. Start the backend server:
   ```bash
   npm start
   # or
   npm run dev
   ```
4. You should see: `Server running on port 5000` and `MongoDB Connected Successfully`

### 2. Wrong Port Number
**Problem:** Frontend is trying to connect to a different port.

**Check:**
- Frontend expects: `http://localhost:5000` (see `frontend/src/context/AuthContext.jsx`)
- Backend should be running on port 5000 (or update frontend API_URL)

### 3. CORS Issues
**Problem:** Browser blocking requests due to CORS.

**Solution:** The backend already has CORS enabled. If issues persist:
- Check browser console for CORS errors
- Make sure backend `server.js` has `app.use(cors());`

### 4. MongoDB Not Connected
**Problem:** Backend can't connect to MongoDB.

**Solution:**
- Check your `MONGO_URI` in `.env` file
- Make sure MongoDB is running (if local) or connection string is correct (if cloud)

### 5. Firewall/Antivirus Blocking
**Problem:** Security software blocking localhost connections.

**Solution:** Temporarily disable or add exception for localhost:5000

## Quick Test

1. **Test Backend:**
   Open browser and go to: `http://localhost:5000`
   Should see: "API is running..."

2. **Test API Endpoint:**
   Open browser and go to: `http://localhost:5000/api/auth/register`
   Should see: Error (expected - it's a POST endpoint, not GET)

3. **Check Browser Console:**
   Open browser DevTools (F12) → Console tab
   Look for detailed error messages

## Still Having Issues?

1. Check backend terminal for error messages
2. Check browser console (F12) for detailed errors
3. Verify all environment variables are set correctly
4. Make sure no other application is using port 5000

