---
title: "Android – Configure Adapty SDK"
description: ""
metadataTitle: ""
---

Add the following to your `Application` class:

```kotlin title="Kotlin"
override fun onCreate() {
    super.onCreate()
    Adapty.activate(
      applicationContext,
      AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    	  .withObserverMode(false) //default false
    	  .withCustomerUserId(customerUserId) //default null
    	  .withIpAddressCollectionDisabled(false) //default false
    	  .build()
    )  
      
    //OR 
    //the method is deprecated since Adapty SDK v2.10.5
    
    Adapty.activate(applicationContext, "PUBLIC_SDK_KEY", observerMode = false, customerUserId = "YOUR_USER_ID")
}
```
```java title="Java"
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    	  .withObserverMode(false) //default false
    	  .withCustomerUserId(customerUserId) //default null
    	  .withIpAddressCollectionDisabled(false) //default false
    	  .build()
    );
  
    //OR
    //the method is deprecated since Adapty SDK v2.10.5
  
    Adapty.activate(getApplicationContext(), "PUBLIC_SDK_KEY", false, "YOUR_USER_ID");
}
```

Configurational options:

- **Public SDK key** (required): found in your app settings in the [Adapty Dashboard](https://app.adapty.io/) _App settings_ > _General_.
- **Observer mode** (optional): a boolean value controlling [Observer mode](android-observer-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.
- **Customer user ID** (optional): an identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [Profiles](profiles-crm) section.  
  If you don't have user IDs in your app, you can omit this parameter or pass null.  
  If you don't have a user ID at the time of Adapty initialization, you can set it later using `.identify()` method. Read more in the [Identifying Users](android-identifying-users) section.
- **IpAddressCollectionDisabled** (optional) a boolean parameter. Set to `true` to disable the collection of the user IP address. The default value is `false`. Parameter works with `AdaptyConfig.Builder` only.

:::warning
Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.
:::

:::note
**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

### Logging

Adapty logs errors and other important information to help you understand what is going on. There are five levels available:

1. `AdaptyLogLevel.NONE` (default): won't log anything
2. `AdaptyLogLevel.ERROR`: only errors will be logged 
3. `AdaptyLogLevel.WARN`: messages from the SDK that do not cause critical errors, but are worth paying attention to
4. `AdaptyLogLevel.INFO`: various information messages
5. `AdaptyLogLevel.VERBOSE`: any additional information that may be useful during debugging, such as function calls, API queries, etc.

You can set the log level in your app before configuring Adapty.

```kotlin title="Kotlin"
Adapty.logLevel = AdaptyLogLevel.VERBOSE
```
```java title="Java"
Adapty.setLogLevel(AdaptyLogLevel.VERBOSE);
```

### Redirecting the logging system messages

If you for some reason need to send messages from Adapty to your system or save them to a file, you can override the default behavior:

```kotlin title="Kotlin"
Adapty.setLogHandler { level, message ->
    //handle the log
}
```
```java title="Java"
Adapty.setLogHandler((level, message) -> {
    //handle the log
});
```