/**
 * Vercel Serverless Function - CORS Proxy
 * This handles requests to /api/proxy with url query parameter
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
    // Get the target URL from query parameter (Stoplight Elements sends this)
    const targetUrl = req.query.url;
    
    if (!targetUrl) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }
    
    console.log('Proxying request to:', targetUrl);
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    
    // Forward the request
    const response = await fetch(targetUrl, {
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
