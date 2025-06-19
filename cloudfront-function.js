function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // If the request is for an HTML file, serve it normally
    if (uri.endsWith('.html')) {
        return request;
    }
    
    // If the request is for a .md file, serve from the /markdown/ directory
    if (uri.endsWith('.md')) {
        // Remove the .md extension and prepend /markdown/ to serve the markdown file
        var cleanUri = uri.slice(0, -3); // Remove .md
        request.uri = '/markdown' + cleanUri + '.md';
        
        // Set content-type header for markdown
        if (!request.headers['accept']) {
            request.headers['accept'] = { value: 'text/plain' };
        }
        
        return request;
    }
    
    // For requests without extension, serve HTML (your normal docs)
    if (!uri.endsWith('/') && !uri.includes('.')) {
        request.uri = uri + '.html';
    }
    
    // For directory requests, serve index.html
    if (uri.endsWith('/') && uri !== '/') {
        request.uri = uri + 'index.html';
    }
    
    return request;
}