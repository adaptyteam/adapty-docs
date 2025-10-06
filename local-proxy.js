/**
 * Simple local proxy server for development
 * Run with: node local-proxy.js
 * Then use: http://localhost:3001/api-proxy
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'adapty-customer-user-id', 'adapty-profile-id', 'adapty-platform']
}));

// Proxy for regular API
app.use('/api-proxy', (req, res) => {
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }
  
  console.log('Proxying to:', targetUrl);
  
  // Use http-proxy-middleware to forward the request
  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/api-proxy': '', // Remove the /api-proxy prefix
    },
    onProxyReq: (proxyReq, req, res) => {
      // Forward all headers
      Object.keys(req.headers).forEach(key => {
        if (key !== 'host') {
          proxyReq.setHeader(key, req.headers[key]);
        }
      });
    },
    onProxyRes: (proxyRes, req, res) => {
      // Add CORS headers
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, adapty-customer-user-id, adapty-profile-id, adapty-platform';
    }
  });
  
  proxy(req, res);
});

// Proxy for admin API
app.use('/api-proxy-admin', (req, res) => {
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }
  
  console.log('Proxying admin to:', targetUrl);
  
  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/api-proxy-admin': '',
    },
    onProxyReq: (proxyReq, req, res) => {
      Object.keys(req.headers).forEach(key => {
        if (key !== 'host') {
          proxyReq.setHeader(key, req.headers[key]);
        }
      });
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, adapty-customer-user-id, adapty-profile-id, adapty-platform';
    }
  });
  
  proxy(req, res);
});

app.listen(PORT, () => {
  console.log(`Local proxy server running on http://localhost:${PORT}`);
  console.log('Use these URLs in your frontend:');
  console.log('  Regular API: http://localhost:3001/api-proxy');
  console.log('  Admin API: http://localhost:3001/api-proxy-admin');
});
