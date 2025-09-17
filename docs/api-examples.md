# API Examples

This page demonstrates how to use Adapty's API with interactive examples.

## Quick Start

The easiest way to get started with the Adapty API is to use our interactive API explorer. You can test endpoints directly in your browser without writing any code.

<ApiEmbed 
  apiUrl="/oas/adapty-api.json" 
  title="Adapty API Explorer" 
  height="500px"
/>

## Profile Management

### Creating a Profile

To create a new user profile, you'll need to provide a `customer_user_id` and optionally an email address.

**Request:**
```bash
curl -X POST "https://api.adapty.io/v1/profiles" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_user_id": "user_123",
    "email": "user@example.com"
  }'
```

**Response:**
```json
{
  "profile_id": "adapty_profile_456",
  "customer_user_id": "user_123",
  "email": "user@example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Retrieving Profiles

You can retrieve a list of profiles with optional pagination parameters.

**Request:**
```bash
curl -X GET "https://api.adapty.io/v1/profiles?limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Subscription Management

### Getting Subscriptions

Retrieve subscriptions for a specific profile or filter by status.

**Request:**
```bash
curl -X GET "https://api.adapty.io/v1/subscriptions?profile_id=adapty_profile_456&status=active" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Interactive Testing

Use the API explorer below to test these endpoints interactively:

<ApiEmbed 
  apiUrl="/oas/adapty-api.json" 
  title="Test API Endpoints" 
  height="700px"
/>

## Next Steps

1. **Get your API key** from the Adapty dashboard
2. **Try the interactive examples** above
3. **Integrate with your app** using our SDKs
4. **Check our guides** for more detailed examples

## Need Help?

- 📚 [Full API Documentation](/api-reference)
- 💬 [Contact Support](mailto:support@adapty.io)
- 🐛 [Report Issues](https://github.com/adaptyteam/adapty-docs/issues)
