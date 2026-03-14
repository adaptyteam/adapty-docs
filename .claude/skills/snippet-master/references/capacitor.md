# Capacitor (TypeScript) Snippets

## Error Handling Pattern

Use `try/catch` with `async/await` (same as React Native):

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
- Use `const` for variables
- Use camelCase for variables
- Always include try/catch
- Include `console.log`/`console.error` in demo examples (unique to Capacitor vs other platforms)

## Note on Capacitor vs React Native

Patterns are nearly identical. The main distinction: Capacitor examples often include `console.log`/`console.error` for demonstration purposes, unlike React Native examples.

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

### Purchase with All Result Types
```typescript
try {
  const result = await adapty.makePurchase({ product });

  if (result.type === 'success') {
    const isSubscribed = result.profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;

    if (isSubscribed) {
      console.log('User is now subscribed!');
    }
  } else if (result.type === 'user_cancelled') {
    console.log('Purchase cancelled by user');
  } else if (result.type === 'pending') {
    console.log('Purchase is pending');
  }
} catch (error) {
  console.error('Purchase failed:', error);
}
```

### Configuration
```typescript
await adapty.activate({
  apiKey: 'YOUR_PUBLIC_SDK_KEY',
  params: {
    android: {
        enablePendingPrepaidPlans: true,
    },
  }
});
```

### Import
```typescript
import { adapty } from '@adapty/capacitor';
```
