| AdaptyAccessLevel | <p>[Access levels](access-level) let you control what your app's users can do in your mobile app without hardcoding specific product IDs. Each product defines how long the user gets a certain access level for. So, whenever a user makes a purchase, Adapty grants access to the app for a specific period (for subscriptions) or forever (for lifetime purchases).</p><p>When you create an app in the Adapty Dashboard, the premium access level is automatically generated.</p><ul><li> accessLevelIdentifier</li><li> accessLevel</li></ul> |
| AdaptyAccessLevelIdentifiers | Unique identifiers of the [access levels configured by you](create-access-level) in Adapty Dashboard. |
| AdaptyError | Information about error: <ul><li> **errorCode**: Code of the returned error. Refer to [full list of errors](error-handling-on-flutter-react-native-unity) for detailed description and ways to handle it.</li><li> **errorMessage**: Short description of the message</li></ul> |
| AdaptyCustomDoubleAttribute | required |
| AdaptyCustomStringAttribute | required |
| AdaptyGetIntroEligibiliesResult | Contains AdaptyIntroProductEligibility and errors if any. |
| AdaptyGetProductResult | required |
| AdaptyGetProfileResult | required |
| AdaptyIntroProductEligibility | Defines if the user qualifies for an introductory offer for an iOS subscription: <ul><li> **eligible**: The user is eligible for an intro offer, it is safe to reflect this info in your UI. </li><li> **ineligible**:	The user is not eligible to get any offer, you shouldn't present it in your UI. </li><li> **notApplicable**: This product is not configured to have an offer. </li></ul> |
| AdaptyMakePurchaseResult | Contains the result of the purchase: success or failure. |
| AdaptyNonSubscription | Information about the user's non-subscription purchases. |
| AdaptyPaywall | Contains information about a [paywall](paywalls). |
| AdaptyPaywallProduct | Contains information about [products](product) of the paywall.  |
| AdaptyGetPaywallResult | Contains result of the getPaywall action: <ul><li> [AdaptyPaywall](paywalls)</li><li> AdaptyError</li></ul> |
| AdaptyProfile | required |
| AdaptyProfileParameters | required |
| AdaptyPrice | The cost of the product in the local currency. |
| AdaptySubscription | Information about the user's subscription. |
| AdaptySubscriptionPeriod | The period details for products that are subscriptions. |
| AdaptySubscriptionPhase | required |
| AdaptySubscriptionDetails | required |
| AdaptyProductSubscriptions | required |
| AdaptyProductNonSunscriptions | required |
| MapKeyNonSubscribers | required |
| MapKeySubsciptions | required |