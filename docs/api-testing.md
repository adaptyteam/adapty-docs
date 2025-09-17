# API Testing

Adapty provides an interactive API testing interface that allows you to explore and test our API endpoints directly from the documentation.

## Features

- **Interactive API Explorer**: Browse all available endpoints with detailed documentation
- **Try It Out**: Test API calls directly in the browser with real-time responses
- **Authentication**: Built-in support for API key authentication
- **Request/Response Examples**: See example requests and responses for each endpoint
- **Schema Documentation**: Detailed parameter and response schema information

## Getting Started

1. Navigate to the [API Reference](/api-reference) page
2. Select an endpoint you want to test
3. Click "Try it out" to enable the interactive interface
4. Fill in the required parameters
5. Add your API key in the Authorization section
6. Click "Execute" to make the request

## Authentication

All API requests require authentication using your API key. You can find your API key in the Adapty dashboard under Settings > API Keys.

To authenticate:
1. Click the "Authorize" button at the top of the API reference
2. Enter your API key in the format: `Bearer YOUR_API_KEY`
3. Click "Authorize"

## Available Endpoints

### Profiles
- `GET /v1/profiles` - List all profiles
- `POST /v1/profiles` - Create a new profile
- `GET /v1/profiles/{profile_id}` - Get a specific profile
- `PUT /v1/profiles/{profile_id}` - Update a profile

### Subscriptions
- `GET /v1/subscriptions` - List subscriptions with optional filtering

## Example Usage

Here's an example of how to create a new profile:

```bash
curl -X POST "https://api.adapty.io/v1/profiles" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_user_id": "user_123",
    "email": "user@example.com"
  }'
```

## Error Handling

The API returns standard HTTP status codes and detailed error messages. Common error responses include:

- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Invalid or missing API key
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limits

API requests are subject to rate limiting. Please refer to the [Rate Limits documentation](/docs/rate-limits) for more information.

## Support

If you encounter any issues with the API testing interface or have questions about specific endpoints, please contact our support team at support@adapty.io.
