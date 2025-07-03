---
title: "Implement web paywalls"
description: "Learn how to implement web paywalls in your React Native app with Adapty SDK."
metadataTitle: "Implement Web Paywalls | React Native SDK | Adapty Docs"
slug: /react-native-web-paywall
displayed_sidebar: sdkreactnative
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

```javascript
import { Adapty } from 'react-native-adapty';

const paywalls = await Adapty.getPaywalls();
const paywall = paywalls[0];

if (paywall.visualPaywall?.webViewUrl) {
  const webPaywallUrl = paywall.visualPaywall.webViewUrl;
  console.log('Web paywall URL:', webPaywallUrl);
}
```

## Present web paywall

To present a web paywall using React Native WebView:

```javascript
import React from 'react';
import { WebView } from 'react-native-webview';
import { Modal, View, StyleSheet } from 'react-native';

const WebPaywallModal = ({ visible, paywallUrl, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <WebView
          source={{ uri: paywallUrl }}
          style={styles.webview}
          onMessage={(event) => {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'purchase') {
              // Handle purchase
              handlePurchase(data.productId);
            } else if (data.type === 'close') {
              onClose();
            }
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
```

## Handle web paywall events

Web paywalls communicate with your app through postMessage:

```javascript
const handleWebViewMessage = (event) => {
  const data = JSON.parse(event.nativeEvent.data);
  
  switch (data.type) {
    case 'purchase':
      handlePurchase(data.productId);
      break;
    case 'restore':
      handleRestore();
      break;
    case 'close':
      closePaywall();
      break;
    case 'error':
      handleError(data.error);
      break;
  }
};
```

## Purchase flow

When a user makes a purchase through the web paywall:

```javascript
const handlePurchase = async (productId) => {
  try {
    const paywalls = await Adapty.getPaywalls();
    const paywall = paywalls[0];
    const product = paywall.products.find(p => p.vendorProductId === productId);
    
    if (product) {
      const purchase = await Adapty.makePurchase(product);
      console.log('Purchase successful:', purchase);
      // Close paywall and update UI
    }
  } catch (error) {
    console.error('Purchase failed:', error);
  }
};
```

## Restore purchases

Handle restore purchases from web paywall:

```javascript
const handleRestore = async () => {
  try {
    await Adapty.restorePurchases();
    console.log('Purchases restored successfully');
    // Update UI to reflect restored purchases
  } catch (error) {
    console.error('Restore failed:', error);
  }
};
```

## Custom web paywall

You can create custom web paywalls:

```javascript
const CustomWebPaywall = ({ paywall }) => {
  const [webViewUrl, setWebViewUrl] = useState(null);
  
  useEffect(() => {
    if (paywall.visualPaywall?.webViewUrl) {
      setWebViewUrl(paywall.visualPaywall.webViewUrl);
    }
  }, [paywall]);
  
  if (!webViewUrl) {
    return <Text>Loading paywall...</Text>;
  }
  
  return (
    <WebView
      source={{ uri: webViewUrl }}
      onMessage={handleWebViewMessage}
      style={{ flex: 1 }}
    />
  );
};
```

## Error handling

Handle web paywall errors:

```javascript
const handleError = (error) => {
  console.error('Web paywall error:', error);
  
  switch (error.code) {
    case 'NETWORK_ERROR':
      // Handle network error
      break;
    case 'LOAD_ERROR':
      // Handle load error
      break;
    default:
      // Handle other errors
      break;
  }
};
``` 