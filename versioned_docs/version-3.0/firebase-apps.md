---
title: "Firebase apps"
description: "Integrate Firebase with Adapty to enhance user analytics and subscription tracking for your mobile app."
metadataTitle: "Firebase Integration for Apps | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page is about integration of Adapty in you app, if it works on Firebase.

:::note
Get started

This is not all steps required for Adapty to work, just some useful tips for integration with Firebase. If you want to integrate Adapty in you app, you should read [Quickstart Guide](quickstart) first
:::

## User Identification

If you're using Firebase auth, this snippet may help you keep your users in sync between Firebase and Adapty. Note that it's just an example, and you should consider your app auth specifics.

<Tabs groupId="current-os" queryString>
<TabItem value="Swift" label="iOS with Firebase" default>
```swift showLineNumbers
import Adapty
import Firebase
 
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
 
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Configure Adapty before Firebase
        Adapty.activate("YOUR_API_KEY")
        Adapty.delegate = self
        
        // Configure Firebase
        FirebaseApp.configure()
        
        // Add state change listener for Firebase Authentication
        Auth.auth().addStateDidChangeListener { (auth, user) in
            if let uid = user?.uid {
                // identify Adapty SDK with new Firebase user
                Adapty.identify(uid) { error in
                    if let e = error {
                        print("Sign in error: \(e.localizedDescription)")
                    } else {
                        print("User \(uid) signed in")
                    }
                }
            }
        }
 
        return true
    }
 
}
 
extension AppDelegate: AdaptyDelegate {
 
    // MARK: - Adapty delegate
    func didReceiveUpdatedPurchaserInfo(_ purchaserInfo: PurchaserInfoModel) {
        // You can optionally post to the notification center whenever
        // purchaser info changes.
 
        // You can subscribe to this notification throughout your app
        // to refresh tableViews or change the UI based on the user's
        // subscription status
        
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "com.Adapty.PurchaserInfoUpdatedNotification"), object: purchaserInfo)
    }
 
}
```
</TabItem>
<TabItem value="kotlin" label="Android with Firebase" default>
```kotlin showLineNumbers
class App : Application() {

    override fun onCreate() {
        super.onCreate()
        // Configure Adapty
        Adapty.activate(this, "YOUR_API_KEY")

        Adapty.setOnPurchaserInfoUpdatedListener(object : OnPurchaserInfoUpdatedListener {
            override fun onPurchaserInfoReceived(purchaserInfo: PurchaserInfoModel) {
                // handle any changes to subscription state
            }
        })

        // Add state change listener for Firebase Authentication
        FirebaseAuth.getInstance().addAuthStateListener { auth ->
            val currentUserId = auth.currentUser?.uid

            if (currentUserId != null) {
                // identify Adapty SDK with new Firebase user
                Adapty.identify(currentUserId) { error ->
                    if (error == null) {
                        //success
                    }
                }
            } else {
                Adapty.logout { }
            }
        }
    }
}
```
</TabItem>
</Tabs>

