---
title: "Identify users in Kotlin Multiplatform SDK"
description: "Learn how to identify users in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Identify Users | Adapty Docs"
keywords: ['identify', 'user id', 'customer id']
rank: 95
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

User identification is optional but recommended for most apps. When you identify users, Adapty can:

- Track subscription status across devices
- Provide consistent analytics and user data
- Enable server-side operations like granting access levels

## Identify users

To identify a user, call the `identify` method with your user ID:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.identify("USER_ID") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // User identified successfully
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.identify("USER_ID", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // User identified successfully
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle error
    }
});
```
</TabItem>
</Tabs>

## When to identify users

Identify users when they:

- **Sign in to your app** - Use their account ID or email
- **Create an account** - Use the newly created user ID
- **Complete onboarding** - Use a generated or assigned user ID

## Example: Identify user on login

Here's how to identify a user when they sign in to your app:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        findViewById<Button>(R.id.login_button).setOnClickListener {
            performLogin()
        }
    }

    private fun performLogin() {
        // Your login logic here
        val userId = "user_123" // Get from your authentication system
        
        Adapty.identify(userId) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val profile = result.value
                    // User identified successfully
                    // Navigate to main screen
                    startActivity(Intent(this, MainActivity::class.java))
                    finish()
                }
                is AdaptyResult.Error -> {
                    // Handle error but still allow login
                    // User can still use the app
                    startActivity(Intent(this, MainActivity::class.java))
                    finish()
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class LoginActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        findViewById(R.id.login_button).setOnClickListener(v -> performLogin());
    }

    private void performLogin() {
        // Your login logic here
        String userId = "user_123"; // Get from your authentication system
        
        Adapty.identify(userId, result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
                // User identified successfully
                // Navigate to main screen
                startActivity(new Intent(this, MainActivity.class));
                finish();
            } else if (result instanceof AdaptyResult.Error) {
                // Handle error but still allow login
                // User can still use the app
                startActivity(new Intent(this, MainActivity.class));
                finish();
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Update user attributes

You can also update user attributes when identifying them:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
val attributes = mapOf(
    "email" to "user@example.com",
    "name" to "John Doe",
    "age" to 25
)

Adapty.identify("USER_ID", attributes) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // User identified with attributes
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // Handle error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Map<String, Object> attributes = new HashMap<>();
attributes.put("email", "user@example.com");
attributes.put("name", "John Doe");
attributes.put("age", 25);

Adapty.identify("USER_ID", attributes, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // User identified with attributes
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // Handle error
    }
});
```
</TabItem>
</Tabs>

## Next steps

After identifying users, you can:

- [Check their subscription status](kmp-check-subscription-status.md)
- [Show paywalls](kmp-present-paywalls.md) based on their access level
- [Update user attributes](kmp-setting-user-attributes.md) as needed
