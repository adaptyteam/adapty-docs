---
title: Adapty Web API
description: ""
metadataTitle: ""
toc_max_heading_level: 4
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

## About Web API



## Authentication

- **Base URL**: https://api-admin.adapty.io/api/v1/web-api/
- **Authorization header**: API requests must be authenticated by your public API key as the **Authorization** header with the value `Api-Key {YOUR_PUBLIC_API_KEY}`, for example, `Api-Key public_live_iNuUlSsN.83zcTTT8D5Y8FI9cGUI6`. Find this key in the [Adapty Dashboard -> **App Settings** -> **General** tab -> **API keys** section](https://app.adapty.io/settings/general).
- **Content-Type header**: Set the **Content-Type** header to `application/json` for the API to process your request.
- **Body**: The API expects the request to use the body as JSON.
