function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // If the request is for an HTML file, serve it normally
    if (uri.endsWith('.html')) {
        return request;
    }
    
    // If the request is for a .md file, serve the corresponding HTML file
    if (uri.endsWith('.md')) {
        request.uri = uri.replace(/\.md$/, '.html');
        return request;
    }
    
    // For all other requests, try to serve the HTML version
    if (!uri.endsWith('/') && !uri.includes('.')) {
        request.uri = uri + '.html';
    }
    
    return request;
} 