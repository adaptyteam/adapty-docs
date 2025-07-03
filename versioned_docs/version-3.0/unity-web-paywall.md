---
title: "Implement web paywalls"
description: "Learn how to implement web paywalls in your Unity app with Adapty SDK."
metadataTitle: "Implement Web Paywalls | Unity SDK | Adapty Docs"
slug: /unity-web-paywall
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Web paywall overview

Web paywalls allow you to present paywalls using web technologies while maintaining native purchase flow. This is useful for:

- Cross-platform consistency
- Easy A/B testing
- Dynamic content updates
- Complex UI layouts

## Get web paywall URL

To get a web paywall URL:

```csharp
using Adapty;

var paywalls = await Adapty.GetPaywalls();
var paywall = paywalls[0];

if (paywall.VisualPaywall?.WebViewUrl != null)
{
    var webPaywallUrl = paywall.VisualPaywall.WebViewUrl;
    Debug.Log($"Web paywall URL: {webPaywallUrl}");
}
```

## Present web paywall

To present a web paywall using Unity WebView:

```csharp
using UnityEngine;
using UnityEngine.UI;

public class WebPaywallUI : MonoBehaviour
{
    public RawImage webViewDisplay;
    
    public async void ShowWebPaywall(string paywallId)
    {
        var paywalls = await Adapty.GetPaywalls();
        var paywall = paywalls.FirstOrDefault(p => p.DeveloperId == paywallId);
        
        if (paywall?.VisualPaywall?.WebViewUrl != null)
        {
            // Load web paywall in WebView
            LoadWebPaywall(paywall.VisualPaywall.WebViewUrl);
        }
    }
    
    private void LoadWebPaywall(string url)
    {
        // Implement WebView loading logic
        // This depends on your WebView plugin
    }
}
```

## Handle web paywall events

Web paywalls communicate with your app through JavaScript:

```csharp
public class WebPaywallHandler : MonoBehaviour
{
    public void HandleWebViewMessage(string message)
    {
        var data = JsonUtility.FromJson<WebPaywallAction>(message);
        
        switch (data.type)
        {
            case "purchase":
                HandlePurchase(data.productId);
                break;
            case "restore":
                HandleRestore();
                break;
            case "close":
                ClosePaywall();
                break;
            case "error":
                HandleError(data.error);
                break;
        }
    }
}

[System.Serializable]
public class WebPaywallAction
{
    public string type;
    public string productId;
    public string error;
}
```

## Purchase flow

When a user makes a purchase through the web paywall:

```csharp
private async void HandlePurchase(string productId)
{
    try
    {
        var paywalls = await Adapty.GetPaywalls();
        var paywall = paywalls[0];
        var product = paywall.Products.FirstOrDefault(p => p.VendorProductId == productId);
        
        if (product != null)
        {
            var purchase = await Adapty.MakePurchase(product);
            Debug.Log($"Purchase successful: {purchase.PurchaseId}");
            // Close paywall and update UI
        }
    }
    catch (Exception error)
    {
        Debug.LogError($"Purchase failed: {error.Message}");
    }
}
```

## Restore purchases

Handle restore purchases from web paywall:

```csharp
private async void HandleRestore()
{
    try
    {
        await Adapty.RestorePurchases();
        Debug.Log("Purchases restored successfully");
        // Update UI to reflect restored purchases
    }
    catch (Exception error)
    {
        Debug.LogError($"Restore failed: {error.Message}");
    }
}
```

## Custom web paywall

You can create custom web paywalls:

```csharp
public class CustomWebPaywall : MonoBehaviour
{
    private string webViewUrl;
    
    public async void InitializeWebPaywall(AdaptyPaywall paywall)
    {
        if (paywall.VisualPaywall?.WebViewUrl != null)
        {
            webViewUrl = paywall.VisualPaywall.WebViewUrl;
            LoadWebPaywall();
        }
    }
    
    private void LoadWebPaywall()
    {
        if (!string.IsNullOrEmpty(webViewUrl))
        {
            // Load web paywall in your WebView component
        }
    }
}
```

## Error handling

Handle web paywall errors:

```csharp
private void HandleError(string error)
{
    Debug.LogError($"Web paywall error: {error}");
    
    switch (error)
    {
        case "NETWORK_ERROR":
            // Handle network error
            break;
        case "LOAD_ERROR":
            // Handle load error
            break;
        default:
            // Handle other errors
            break;
    }
}
``` 