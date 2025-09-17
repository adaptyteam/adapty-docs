# Simple API Examples

This page demonstrates how to use Adapty's API with our simplified interactive examples.

## Quick Start

The easiest way to get started with the Adapty API is to use our interactive API explorer. You can test endpoints directly in your browser without writing any code.

<SimpleApiEmbed 
  title="Adapty API Explorer" 
  baseUrl="https://api.adapty.io"
  endpoints={[
    {
      method: "GET",
      path: "/v1/profiles",
      summary: "Get profiles",
      description: "Retrieve a list of user profiles",
      parameters: [
        {
          name: "limit",
          in: "query",
          required: false,
          description: "Number of profiles to return",
          type: "integer"
        }
      ],
      responses: [
        {
          code: "200",
          description: "Successful response",
          example: {
            data: [
              {
                profile_id: "adapty_profile_123",
                customer_user_id: "user_456",
                email: "user@example.com"
              }
            ]
          }
        }
      ]
    },
    {
      method: "POST",
      path: "/v1/profiles",
      summary: "Create profile",
      description: "Create a new user profile",
      requestBody: {
        description: "Profile data",
        schema: {
          customer_user_id: "string (required)",
          email: "string (optional)"
        }
      },
      responses: [
        {
          code: "201",
          description: "Profile created successfully"
        }
      ]
    }
  ]}
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

## Interactive Testing

Use the API explorer above to test these endpoints interactively:

1. Click "Show API" to expand the interactive interface
2. Select an endpoint you want to test
3. Review the parameters and request body
4. Click "Try it out" to see a mock response

## Next Steps

1. **Get your API key** from the Adapty dashboard
2. **Try the interactive examples** above
3. **Integrate with your app** using our SDKs
4. **Check our guides** for more detailed examples

## Need Help?

- 📚 [Full API Documentation](/simple-api)
- 💬 [Contact Support](mailto:support@adapty.io)
- 🐛 [Report Issues](https://github.com/adaptyteam/adapty-docs/issues)
