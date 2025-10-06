/**
 * Vercel Serverless Function - CORS Proxy
 * This handles requests to /api/proxy
 */

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, adapty-customer-user-id, adapty-profile-id, adapty-platform');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    // Get the path from query parameter
    const targetPath = req.query.path || '/';
    const targetHost = 'api.adapty.io';
    
    // Build the full URL
    const url = `https://${targetHost}${targetPath}`;
    
    console.log('Proxying request to:', url);
    
    // Forward the request
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        'Authorization': req.headers['authorization'] || '',
        'adapty-customer-user-id': req.headers['adapty-customer-user-id'] || '',
        'adapty-profile-id': req.headers['adapty-profile-id'] || '',
        'adapty-platform': req.headers['adapty-platform'] || '',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });
    
    // Get response data
    const data = await response.text();
    
    // Forward the response
    res.status(response.status).send(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
}
