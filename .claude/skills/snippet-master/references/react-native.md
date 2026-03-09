# React Native (TypeScript) Snippets

## Error Handling Pattern

Use `try/catch` with `async/await`:

```typescript
try {
    const profile = await adapty.getProfile();
    // check the access
} catch (error) {
    // handle the error
}
```

## Best Practices
- Use `async/await` (not `.then()/.catch()`)
- Use `const` for variables (prefer over `let`)
- Use camelCase for variables
- Always include try/catch for async operations
- Keep error handling concise

## Common Patterns

```typescript
// Async/await pattern
const profile = await adapty.getProfile();

// Accessing nested properties
if (profile.accessLevels?.["YOUR_ACCESS_LEVEL"]?.isActive) {
    // grant access
}

// Parameter objects
const params = {
    variationId: "variation_id",
    productId: "product_id"
};
```

## Type Discriminated Unions

Purchase results use switch on `.type`:

```typescript
switch (purchaseResult.type) {
  case 'success':
    const profile = purchaseResult.profile;
    break;
  case 'user_cancelled':
    break;
  case 'pending':
    break;
}
```

Key pattern: Use `switch` on `.type` field with string literals.

## Examples

### Get Profile
```typescript
try {
    const profile = await adapty.getProfile();
    // check the access
} catch (error) {
    // handle the error
}
```

### Make Purchase with Context
```typescript
try {
    const product = await adapty.getPaywallProduct({
        paywallId: "paywall_id",
        productId: "product_id"
    });

    const profile = await adapty.makePurchase(product);
    // process the purchase
} catch (error) {
    // handle the error
}
```

### Purchase with All Result Types
```typescript
try {
    const purchaseResult = await adapty.makePurchase(product);
    switch (purchaseResult.type) {
      case 'success':
        const isSubscribed = purchaseResult.profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;
        if (isSubscribed) {
          // Grant access to the paid features
        }
        break;
      case 'user_cancelled':
        // Handle the case where the user canceled the purchase
        break;
      case 'pending':
        // Handle deferred purchases (e.g., the user will pay offline with cash)
        break;
    }
} catch (error) {
    // Handle the error
}
```

### Subscription Update Parameters
```typescript
try {
    const purchaseResult = await adapty.makePurchase(product, params);
    // ... handle result
} catch (error) {
    // Handle the error
}
```

Where params structure is:
```typescript
{
    android: {
        subscriptionUpdateParams: {
            oldSubVendorProductId: 'old_product_id',
            prorationMode: 'charge_prorated_price'
        },
        isOfferPersonalized: true
    }
}
```

### Error Instance Checking
```typescript
try {
  const params: MakePurchaseParamsInput = {};
  await adapty.makePurchase(product, params);
} catch (error) {
  if (
    error instanceof AdaptyError &&
    error.adaptyCode === getErrorCode(ErrorCode['2'])
  ) {
    // payment cancelled
  }
}
```

Shows specific error type checking, not just generic catch blocks.

### Configuration
```typescript
adapty.activate("PUBLIC_SDK_KEY", {
    android: { pendingPrepaidPlansEnabled: true }
});
```
