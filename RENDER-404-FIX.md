# 🔧 Fix Render 404 Error

## Problem
Getting `404 Not Found` errors on your Render-hosted frontend when directly accessing routes like `/login`, `/cart`, etc.

## Root Cause
This happens because Render treats your React app as static files. When you navigate to `/login`, it looks for a file called `login` on the server instead of serving `index.html` and letting React Router handle the routing.

## ✅ Solution (Already Applied)

I've updated your configuration files to fix this:

### 1. Updated `vite.config.js`
Added explicit build configuration to ensure proper output:
- `outDir: 'dist'` - Specifies build directory
- `publicDir: 'public'` - Ensures `_redirects` is copied to dist

### 2. Verified `_redirects` file
The `frontend/public/_redirects` file tells Render to route all requests to `index.html`:
```
/*    /index.html    200
```

This file will be automatically copied to the `dist` folder during build.

## 📋 Steps to Deploy Fix

### Step 1: Verify Local Build
```bash
cd frontend
npm run build
```

Check that `dist/_redirects` exists after build.

### Step 2: Commit and Push Changes
```bash
git add .
git commit -m "fix: Configure SPA routing for Render deployment"
git push origin main
```

### Step 3: Trigger Redeploy on Render

**Option A: Auto-deploy** (if enabled)
- Render will automatically detect the push and redeploy

**Option B: Manual deploy**
1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your frontend service (Static Site)
3. Click "Manual Deploy" → "Deploy latest commit"

### Step 4: Verify Build Settings on Render

Make sure your Render settings match:
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

## 🧪 Testing After Deployment

1. **Wait for deployment to complete** (green checkmark on Render)
2. **Clear your browser cache** (Ctrl+Shift+R or Cmd+Shift+R)
3. **Test these scenarios**:
   - Navigate to: `https://your-app.onrender.com/`
   - Navigate to: `https://your-app.onrender.com/login`
   - Navigate to: `https://your-app.onrender.com/cart`
   - Refresh the page on any route

All should work without 404 errors!

## 🔍 Additional Troubleshooting

### If 404 persists:

**Check #1: Verify _redirects is in dist**
```bash
cd frontend
npm run build
ls dist/_redirects  # Should exist
```

**Check #2: Verify Render Publish Directory**
- Go to Render Dashboard → Your Frontend Service → Settings
- Make sure "Publish Directory" is set to `dist` (not `frontend/dist`)

**Check #3: Check Render Logs**
- Go to Render Dashboard → Your Frontend Service → Logs
- Look for any build errors
- Verify the build completes successfully

**Check #4: Backend URL**
Make sure `frontend/.env.production` has your correct backend URL:
```
VITE_API_BASE_URL=https://your-backend.onrender.com
```

### If you get CORS errors instead of 404:
This means routing is working! You need to verify:
1. Backend is running and accessible
2. Backend CORS configuration includes your frontend URL

## 🎯 Why This Works

1. **Vite copies `_redirects`** from `public/` to `dist/` during build
2. **Render reads `_redirects`** and applies the routing rule
3. **All requests return `index.html`** with a 200 status code
4. **React Router takes over** and handles client-side routing

## 📞 Still Having Issues?

If the problem persists after following these steps:
1. Check Render build logs for errors
2. Verify the `dist` folder contains both `index.html` and `_redirects`
3. Try a hard refresh (clear cache)
4. Check browser console for any JavaScript errors

---

**Note**: Free tier Render services sleep after 15 minutes of inactivity. First load may take 30-50 seconds as the service wakes up. This is normal behavior.
