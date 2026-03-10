# Unity (C#) Snippets

## Error Handling Pattern

Use callback pattern with null check and early return:

```csharp
Adapty.GetProfile((profile, error) => {
    if (error != null) {
        // handle the error
        return;
    }
    // check the access
});
```

## Best Practices
- Check `error != null` first, then early return
- Use PascalCase for method names (Unity convention)
- Use lambda expressions for callbacks
- Always handle the error case
- Keep callbacks concise

## Common Patterns

```csharp
// Callback with error check
Adapty.GetProfile((profile, error) => {
    if (error != null) {
        // handle the error
        return;
    }
    // use profile
});

// Null checking
if (profile.AccessLevels?["YOUR_ACCESS_LEVEL"]?.IsActive == true) {
    // grant access
}

// Parameter objects
var params = new AdaptySubscriptionUpdateParameters {
    OldSubVendorProductId = "old_product_id",
    ReplacementMode = AdaptySubscriptionUpdateReplacementMode.WithTimeProration
};
```

## Examples

### Get Profile
```csharp
Adapty.GetProfile((profile, error) => {
    if (error != null) {
        // handle the error
        return;
    }
    // check the access
});
```

### Purchase with All Result Types
```csharp
Adapty.MakePurchase(product, (result, error) => {
  switch (result.Type) {
    case AdaptyPurchaseResultType.Pending:
      // handle pending purchase
      break;
    case AdaptyPurchaseResultType.UserCancelled:
      // handle purchase cancellation
      break;
    case AdaptyPurchaseResultType.Success:
      var profile = result.Profile;
      // handle successful purchase
      break;
    default:
      break;
  }
});
```

### Subscription Update
```csharp
var subscriptionUpdateParams = new AdaptySubscriptionUpdateParameters(
    "old_product_id",
    AdaptySubscriptionUpdateReplacementMode.WithTimeProration
);

Adapty.MakePurchase(product, subscriptionUpdateParams, (profile, error) => {
  if (error != null) {
      // Handle the error
      return;
  }
  // successful cross-grade
});
```
