import React from "react";
import Layout from "@theme/Layout";
import SimpleApi from "../../components/SimpleApi";

const apiEndpoints = [
  {
    method: "GET",
    path: "/v1/profiles",
    summary: "Get profiles",
    description: "Retrieve a list of user profiles with optional pagination",
    parameters: [
      {
        name: "limit",
        in: "query",
        required: false,
        description: "Number of profiles to return",
        type: "integer"
      },
      {
        name: "offset",
        in: "query",
        required: false,
        description: "Number of profiles to skip",
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
              email: "user@example.com",
              created_at: "2024-01-15T10:30:00Z"
            }
          ],
          meta: {
            total: 1,
            limit: 20,
            offset: 0
          }
        }
      },
      {
        code: "401",
        description: "Unauthorized - Invalid API key"
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
        description: "Profile created successfully",
        example: {
          profile_id: "adapty_profile_789",
          customer_user_id: "user_456",
          email: "user@example.com",
          created_at: "2024-01-15T10:30:00Z"
        }
      },
      {
        code: "400",
        description: "Bad request - Invalid input data"
      }
    ]
  },
  {
    method: "GET",
    path: "/v1/profiles/{profile_id}",
    summary: "Get profile",
    description: "Retrieve a specific user profile by ID",
    parameters: [
      {
        name: "profile_id",
        in: "path",
        required: true,
        description: "Profile ID",
        type: "string"
      }
    ],
    responses: [
      {
        code: "200",
        description: "Successful response",
        example: {
          profile_id: "adapty_profile_123",
          customer_user_id: "user_456",
          email: "user@example.com",
          created_at: "2024-01-15T10:30:00Z"
        }
      },
      {
        code: "404",
        description: "Profile not found"
      }
    ]
  },
  {
    method: "PUT",
    path: "/v1/profiles/{profile_id}",
    summary: "Update profile",
    description: "Update a user profile",
    parameters: [
      {
        name: "profile_id",
        in: "path",
        required: true,
        description: "Profile ID",
        type: "string"
      }
    ],
    requestBody: {
      description: "Updated profile data",
      schema: {
        email: "string (optional)"
      }
    },
    responses: [
      {
        code: "200",
        description: "Profile updated successfully",
        example: {
          profile_id: "adapty_profile_123",
          customer_user_id: "user_456",
          email: "updated@example.com",
          updated_at: "2024-01-15T11:30:00Z"
        }
      },
      {
        code: "404",
        description: "Profile not found"
      }
    ]
  },
  {
    method: "GET",
    path: "/v1/subscriptions",
    summary: "Get subscriptions",
    description: "Retrieve a list of subscriptions with optional filtering",
    parameters: [
      {
        name: "profile_id",
        in: "query",
        required: false,
        description: "Filter by profile ID",
        type: "string"
      },
      {
        name: "status",
        in: "query",
        required: false,
        description: "Filter by subscription status",
        type: "string"
      }
    ],
    responses: [
      {
        code: "200",
        description: "Successful response",
        example: {
          data: [
            {
              subscription_id: "sub_123",
              profile_id: "adapty_profile_123",
              product_id: "premium_monthly",
              status: "active",
              expires_at: "2024-02-15T10:30:00Z",
              created_at: "2024-01-15T10:30:00Z"
            }
          ],
          meta: {
            total: 1
          }
        }
      }
    ]
  }
];

const SimpleApiPage = () => {
  return (
    <Layout title="Adapty API Reference" description="Interactive API documentation for Adapty">
      <div style={{ padding: "2rem 0" }}>
        <SimpleApi 
          title="Adapty API Reference"
          baseUrl="https://api.adapty.io"
          endpoints={apiEndpoints}
        />
      </div>
    </Layout>
  );
};

export default SimpleApiPage;
