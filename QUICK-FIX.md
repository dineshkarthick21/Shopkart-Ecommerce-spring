# Quick Fix for CORS & Localhost Error

## ❌ Your Current Problem

Your frontend on Render (`https://shopkart-enqf.onrender.com`) is trying to connect to `localhost:8080`, which doesn't exist in production.

## ✅ Solution: 3 Steps

### Step 1: Deploy Your Backend to Render

Your backend **must be deployed** to a public URL. Follow these quick steps:

1. **Go to Render**: https://dashboard.render.com/
2. **Create New Web Service**
3. **Connect GitHub**: `dineshkarthick21/Shopkart-Ecommerce-spring`
4. **Configure**:
   - Name: `shopkart-backend`
   - Build Command: `./mvnw clean install -DskipTests`
   - Start Command: `java -Dserver.port=$PORT -jar target/Course-Registration-Project-0.0.1-SNAPSHOT.jar`
5. **Add Environment Variable**:
   ```
   SPRING_DATA_MONGODB_URI=your-mongodb-atlas-connection-string
   ```
6. **Deploy** (takes ~10 minutes)
7. **Copy your backend URL**: e.g., `https://shopkart-backend-xxxx.onrender.com`

### Step 2: Update Frontend Environment Variable

In Render dashboard for your frontend:

1. **Go to your static site**: `shopkart-enqf`
2. **Click "Environment"**
3. **Add environment variable**:
   ```
   VITE_API_BASE_URL = https://shopkart-backend-xxxx.onrender.com
   ```
   (Replace with your actual backend URL from Step 1)
4. **Click "Save Changes"**
5. **Trigger manual deploy** or wait for auto-redeploy

---

### Step 3: Update Your Code (Already Done!)

✅ **Backend CORS**: Already configured to allow Render URLs
✅ **Frontend Config**: Environment variable support added

Just need to:

1. **Update `.env.production`** locally:
   ```env
   VITE_API_BASE_URL=https://shopkart-backend-xxxx.onrender.com
   ```

2. **Commit and push**:
   ```bash
   git add .
   git commit -m "fix: Configure production API URL"
   git push origin main
   ```

---

## 🎯 What Was Fixed

### Backend Changes:
- ✅ Added Render URL to CORS allowed origins
- ✅ Supports environment variable configuration
- ✅ Health check endpoint enabled

### Frontend Changes:
- ✅ Created `.env.development` for local dev
- ✅ Created `.env.production` for deployment
- ✅ Added API configuration file
- ✅ Updated .gitignore

---

## 🔍 Verify It Works

After deployment:

1. **Test Backend**:
   ```bash
   curl https://shopkart-backend-xxxx.onrender.com/actuator/health
   ```
   Should return: `{"status":"UP"}`

2. **Test Frontend**:
   - Open: `https://shopkart-enqf.onrender.com`
   - Try to login
   - Check browser console (F12) - no CORS errors

---

## ⚡ Quick Checklist

- [ ] Backend deployed to Render
- [ ] Backend health check returns 200 OK
- [ ] Frontend environment variable updated with backend URL
- [ ] Frontend redeployed
- [ ] MongoDB connection string configured
- [ ] CORS errors gone
- [ ] Login works

---

## 🆘 Still Having Issues?

### Check Browser Console
Press F12 → Console tab → Look for:
- ✅ Good: API calls going to your Render backend URL
- ❌ Bad: API calls still going to localhost

### Check Render Logs
1. Go to backend service in Render
2. Click "Logs" tab
3. Look for errors

### Common Issues:
1. **Forgot environment variable**: Add `VITE_API_BASE_URL` in Render dashboard
2. **Trailing slash**: Remove trailing `/` from URLs
3. **MongoDB not connected**: Check connection string
4. **Still localhost**: Clear browser cache and hard reload (Ctrl+Shift+R)

---

## 📖 Full Deployment Guide

See `RENDER-DEPLOYMENT.md` for complete step-by-step instructions.

---

**After following these steps, your app will work perfectly on Render! 🎉**
