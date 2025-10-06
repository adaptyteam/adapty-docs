# Local Proxy Setup - Fix for Development

## The Problem

Stoplight Elements expects the proxy to work with query parameters:
```
http://localhost:3000/api-proxy?url=https://api.adapty.io/api/v2/server-side-api/profile/
```

But the webpack dev server proxy uses path-based routing:
```
http://localhost:3000/api-proxy/api/v2/server-side-api/profile/
```

This causes the URL concatenation issue you're seeing.

## The Solution

I've created a separate local proxy server that works with query parameters.

## Setup (2 minutes)

### 1. Install Dependencies

```bash
npm install cors express http-proxy-middleware
```

### 2. Start the Local Proxy

```bash
npm run proxy
```

You should see:
```
Local proxy server running on http://localhost:3001
Use these URLs in your frontend:
  Regular API: http://localhost:3001/api-proxy
  Admin API: http://localhost:3001/api-proxy-admin
```

### 3. Start Your Docs Site

In a **separate terminal**:

```bash
npm start
```

### 4. Test

Visit http://localhost:3000/docs/api-adapty

Click "Try it" on any endpoint → Should work without URL concatenation!

## How It Works

1. **Stoplight Elements** makes request: `http://localhost:3001/api-proxy?url=https://api.adapty.io/api/v2/server-side-api/profile/`

2. **Local proxy** extracts the `url` parameter and forwards to the actual API

3. **CORS headers** are added and response is returned

## Files Updated

- ✅ `local-proxy.js` - New local proxy server
- ✅ `package.json` - Added dependencies and `proxy` script
- ✅ `src/pages/api-adapty.jsx` - Updated to use port 3001
- ✅ `src/pages/api-web.jsx` - Updated to use port 3001
- ✅ `src/pages/api-export-analytics.jsx` - Updated to use port 3001

## Development Workflow

1. **Start proxy**: `npm run proxy` (runs on port 3001)
2. **Start docs**: `npm start` (runs on port 3000)
3. **Test**: Visit http://localhost:3000/docs/api-adapty

## For Production

When you deploy to Vercel, the frontend will automatically use the Vercel proxy URLs instead of localhost.

## Troubleshooting

### "Cannot find module 'express'"
Run: `npm install cors express http-proxy-middleware`

### "Port 3001 already in use"
The proxy is already running. You can kill it with Ctrl+C and restart.

### Still seeing URL concatenation
Make sure you're using the updated frontend files that point to `localhost:3001`.

## That's It!

Now your local development should work correctly with Stoplight Elements! 🎉
