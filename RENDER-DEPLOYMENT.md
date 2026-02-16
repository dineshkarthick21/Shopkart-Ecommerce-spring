# Deployment Guide for Render.com

This guide will help you deploy both the **Spring Boot Backend** and **React Frontend** to Render.com.

---

## 🚀 Prerequisites

1. GitHub account with your code pushed
2. Render.com account (free tier available)
3. MongoDB Atlas account (free tier) or use Render's PostgreSQL

---

## 📦 Part 1: Deploy MongoDB (Option 1 - Use MongoDB Atlas)

### Using MongoDB Atlas (Recommended for Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Whitelist all IPs (0.0.0.0/0) for Render access
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/shopkart?retryWrites=true&w=majority
   ```

---

## 🔧 Part 2: Deploy Spring Boot Backend

### Step 1: Prepare Backend for Deployment

Your backend is already configured! The `application.properties` supports environment variables.

### Step 2: Deploy to Render

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click "New +"** → **Select "Web Service"**
3. **Connect your GitHub repository**: `dineshkarthick21/Shopkart-Ecommerce-spring`
4. **Configure the service**:
   - **Name**: `shopkart-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (root)
   - **Runtime**: `Java`
   - **Build Command**:
     ```
     ./mvnw clean install -DskipTests
     ```
   - **Start Command**:
     ```
     java -Dserver.port=$PORT -jar target/Course-Registration-Project-0.0.1-SNAPSHOT.jar
     ```
   - **Instance Type**: `Free`

5. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable"
   
   ```
   SPRING_DATA_MONGODB_URI = mongodb+srv://your-username:your-password@cluster.mongodb.net/shopkart?retryWrites=true&w=majority
   SPRING_DATA_MONGODB_DATABASE = shopkart
   ```

6. **Click "Create Web Service"**

7. **Wait for deployment** (5-10 minutes first time)

8. **Copy your backend URL**: 
   - Will be something like: `https://shopkart-backend-xxxx.onrender.com`

---

## 🎨 Part 3: Deploy React Frontend

### Step 1: Update Frontend Configuration

1. **Update `.env.production`** with your backend URL:
   ```env
   VITE_API_BASE_URL=https://shopkart-backend-xxxx.onrender.com
   ```
   Replace with your actual backend URL from Step 2

2. **Update `vite.config.js`** (if needed):
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     server: {
       port: 5173
     },
     build: {
       outDir: 'dist'
     }
   })
   ```

3. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "chore: Configure for Render deployment"
   git push origin main
   ```

### Step 2: Deploy Frontend to Render

1. **Go to Render Dashboard**
2. **Click "New +"** → **Select "Static Site"**
3. **Connect your GitHub repository**: `dineshkarthick21/Shopkart-Ecommerce-spring`
4. **Configure the static site**:
   - **Name**: `shopkart-frontend` (or your choice)
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**:
     ```
     npm install && npm run build
     ```
   - **Publish Directory**: `dist`

5. **Add Environment Variable**:
   ```
   VITE_API_BASE_URL = https://shopkart-backend-xxxx.onrender.com
   ```
   (Use your actual backend URL)

6. **Click "Create Static Site"**

7. **Wait for deployment** (3-5 minutes)

8. **Your app is live!** 
   - URL: `https://shopkart-enqf.onrender.com` (or your assigned URL)

---

## ✅ Part 4: Verify Deployment

### Test Backend
```bash
# Check health
curl https://shopkart-backend-xxxx.onrender.com/actuator/health

# Should return: {"status":"UP"}
```

### Test Frontend
1. Open your frontend URL in browser
2. Try to login with demo credentials
3. Check browser console for errors

---

## 🔧 Troubleshooting

### Issue: "CORS Policy Error"

**Solution**: Already fixed! The backend CORS config includes Render URLs.

### Issue: "Network Error" or "Failed to fetch"

**Checklist**:
- ✅ Backend is deployed and healthy (`/actuator/health` returns 200)
- ✅ Frontend `.env.production` has correct backend URL
- ✅ Backend URL in environment variables doesn't have trailing slash
- ✅ MongoDB connection string is correct
- ✅ Rebuild and redeploy frontend after updating env variables

### Issue: "Database connection failed"

**Solution**:
- Check MongoDB Atlas whitelist includes `0.0.0.0/0`
- Verify connection string has correct username/password
- Check database user has read/write permissions

### Issue: "Build failed" on Render

**Backend**:
- Check Java version is 17 in `pom.xml`
- Ensure `mvnw` has execute permissions

**Frontend**:
- Check `package.json` has correct scripts
- Verify all dependencies are in `package.json`
- Build locally first: `npm run build`

---

## 🔄 Updating Your Deployment

### Update Backend
```bash
# Make changes to backend code
git add .
git commit -m "update: Backend changes"
git push origin main

# Render auto-deploys on push (if auto-deploy enabled)
# Or manually deploy from Render dashboard
```

### Update Frontend
```bash
# Make changes to frontend code
git add .
git commit -m "update: Frontend changes"  
git push origin main

# Render auto-deploys on push
```

---

## 💰 Cost Optimization

### Free Tier Limits
- **Render Free**: 750 hours/month (enough for 1 service 24/7)
- **MongoDB Atlas Free**: 512MB storage
- **Note**: Free services sleep after 15min of inactivity (30-50s cold start)

### Tips
1. Use MongoDB Atlas free tier for database
2. Backend and Frontend each count as separate services
3. Services wake up automatically when accessed
4. Consider upgrading if cold starts are an issue

---

## 📝 Environment Variables Reference

### Backend (Spring Boot)
```env
SPRING_DATA_MONGODB_URI=mongodb+srv://...
SPRING_DATA_MONGODB_DATABASE=shopkart
SERVER_PORT=10000  # Render assigns this automatically
```

### Frontend (React)
```env
VITE_API_BASE_URL=https://your-backend.onrender.com
```

---

## 🔐 Security Best Practices

1. **Never commit** `.env` files with real credentials
2. **Use environment variables** in Render dashboard
3. **Rotate MongoDB passwords** regularly
4. **Enable HTTPS** (Render provides this automatically)
5. **Update CORS origins** to only include your domains in production

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com/
- **MongoDB Atlas Docs**: https://www.mongodb.com/docs/atlas/

---

## 🎉 Congratulations!

Your ShopKart e-commerce application is now live on the internet! 🚀

**Frontend**: https://shopkart-enqf.onrender.com
**Backend**: https://shopkart-backend.onrender.com

Share your live app with friends and showcase your project!
