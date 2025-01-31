---
title:  Authorization and Request format for Web API
description: ""
metadataTitle: ""
toc_max_heading_level: 4
---

## Authorization

API requests must be authenticated by your public API key as the **Authorization** header with the value `Api-Key {your_public_api_key}`, for example, `Api-Key public_live_...`. Find this key in the [Adapty Dashboard -> **App Settings** -> **General** tab -> **API keys** section](https://app.adapty.io/settings/general).

## Request format

- **Content-Type header**: 
  Set the **Content-Type** header to `application/json` for the API to process your request.
- **Body**: 
  The API expects the request to use the body as JSON.

