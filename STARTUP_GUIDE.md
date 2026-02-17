# Zerodha Dashboard - Startup Guide

## ⚠️ IMPORTANT: Always Start Backend First!

To avoid the "Network Error" you were experiencing, you **MUST** start the backend server before accessing the frontend dashboard.

---

## Backend Server Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- `.env` file configured in the `backend/` folder

### Step 1: Configure Environment Variables

Create a `.env` file in the `backend/` folder with:

```env
PORT=3001
MONGO_URL=your_mongodb_connection_string
NODE_ENV=development
```

### Step 2: Install Dependencies

```bash
cd backend
npm install
```

### Step 3: Start the Backend Server

```bash
npm start
```

You should see:
```
MongoDB connected successfully!
Server running on port 3001
```

**🔴 Keep this terminal window OPEN**

---

## Frontend Setup (In a New Terminal)

### Step 1: Install Dependencies

```bash
cd dashboard
npm install
```

### Step 2: Start the Dashboard

```bash
npm start
```

The dashboard will open at `http://localhost:3000`

---

## Troubleshooting Network Errors

### Issue: "Backend server is not running on http://localhost:3001"

**Solution:**
1. Open a **new terminal**
2. Navigate to the backend folder: `cd backend`
3. Run: `npm start`
4. Wait for "MongoDB connected successfully!" message
5. Keep this terminal open while using the dashboard

### Issue: "Cannot find module 'dotenv'" or other dependencies

**Solution:**
```bash
cd backend
npm install
```

### Issue: MongoDB Connection Error

**Solution:**
1. Verify your `MONGO_URL` in `.env` is correct
2. Ensure MongoDB Atlas IP whitelist includes your machine
3. Check your internet connection

---

## Quick Startup Checklist

- [ ] `.env` file exists in `backend/` folder
- [ ] Backend dependencies installed: `npm install` in `backend/`
- [ ] Backend server running on port 3001
- [ ] Dashboard dependencies installed: `npm install` in `dashboard/`
- [ ] Dashboard running on port 3000

When all ✅ are complete, the app will work perfectly!

---

## API Endpoints Configuration

The dashboard expects the backend to be running at: **http://localhost:3001**

Available endpoints:
- `GET /allHoldings` - Fetch user holdings
- `GET /allPositions` - Fetch user positions
- `POST /newOrder` - Place a new buy/sell order

If you want to change the backend URL, set the environment variable:
```bash
set REACT_APP_API_URL=http://your-backend-url:3001
```
