---
title: "Identify users"
description: "Learn how to identify users in your Unity app with Adapty SDK."
metadataTitle: "Identify Users | Unity SDK | Adapty Docs"
slug: /unity-quickstart-identify
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Identify users

To identify a user, call the `Identify` method:

```csharp
using Adapty;

// Identify user with custom ID
Adapty.Identify("user123");

// Or identify user with profile
var profileParams = new AdaptyProfileParameters
{
    Email = "user@example.com",
    PhoneNumber = "+1234567890"
};
Adapty.Identify("user123", profileParams);
```

## Get user profile

To get the current user profile:

```csharp
var profile = await Adapty.GetProfile();
Debug.Log($"User ID: {profile.ProfileId}");
Debug.Log($"Email: {profile.Email}");
```

## Set user attributes

You can set custom attributes for the user:

```csharp
var profileParams = new AdaptyProfileParameters
{
    Email = "user@example.com",
    PhoneNumber = "+1234567890",
    CustomAttributes = new Dictionary<string, object>
    {
        ["user_type"] = "premium",
        ["registration_date"] = "2024-01-01"
    }
};
await Adapty.SetProfile(profileParams);
```

## Clear user data

To clear user data (useful for logout):

```csharp
await Adapty.Logout();
``` 