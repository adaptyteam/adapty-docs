---
title: "Braze"
description: "Integrate Braze with Adapty for seamless customer engagement and push notifications."
metadataTitle: "Braze Integration Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

As one of the top customer engagement solutions, [Braze](https://braze.com/) provides a wide range of tools for push notifications, email, SMS, and in-app messaging. By integrating Adapty with Braze, you can easily access all of your subscription events in one place, giving you the ability to trigger automated communication based on those events. 

Adapty provides a complete set of data that lets you track [subscription events](events) from all stores in one place and can be used to update your users' profiles in Braze. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. Therefore, this integration allows you to track subscription events in your Braze dashboard and map them with your [acquisition campaigns.](https://www.braze.com/product/braze-canvas-flow) 

Adapty sends subscription events, user properties and purchases over to Braze, so you can build target communication with customers using Braze push notifications after a short and easy integration as described below.

## How to set up Braze integration

To integrate Braze go to [**Integrations** -> **Braze**](https://app.adapty.io/integrations/braze), switch on the toggle, and fill out the fields.

The initial step of the integration process is to provide the necessary credentials to establish a connection between your Braze and Adapty profiles. You will need the **REST API Key**, your **Braze Instance ID**, and **App IDs** for iOS and Android for the integration to work properly:


<Zoom>
  <img src={require('./img/5f1e62c-adapty_braze.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





1. **REST API Key** can be created in **Braze Dashboard** → **Settings** → **API Keys**. Make sure your key has a `users.track` permission when creating it:


<Zoom>
  <img src={require('./img/b5fdf16-adapty_braze_create_api_key.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/1e5b4b8-adapty_braze_api_key_users_track.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. To get **Braze Instance ID** note your Braze Dashboard URL and go to the section of [Braze Docs](https://www.braze.com/docs/api/basics/#endpoints) where the instance ID is specified. It should have a regional form such as US-03, EU-01, etc.
3. iOS and Android App IDs can be found in Braze Dashboard → Settings → API Keys as well. Copy them from here:


<Zoom>
  <img src={require('./img/1e6d21b-adapty_braze_app_ids.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Events, user attributes and purchases

Below the credentials, there are three groups of events you can send to Braze from Adapty. Simply turn on the ones you need. You may also change the names of the events as you need to send it to Braze. Check the full list of the Events offered by Adapty [here](events):


<Zoom>
  <img src={require('./img/702e628-adapty_braze_events_names.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Adapty will send subscription events and user attributes to Braze using a server-to-server integration, allowing you to view it in your Braze Dashboard and configure campaigns based on that.

For events that have revenue, such as trial conversions and renewals, Adapty will send this info to Braze as purchases.

[Here](events#properties) you can find the complete specifications for the event properties sent to Braze.

:::note
Helpful user attributes

Adapty sends some user attributes for Braze integration by default. You can refer to the list of them provided below to determine which is best suited for your needs.
:::

| User attribute | Type | Value |
|--------------|----|-----|
| `adapty_customer_user_id` | String | Contains the value of the unique identifier of the user defined by the customer. Can be found both in the Adapty [Dashboard](profiles-crm) and in Braze. |
| `adapty_profile_id` | String | Contains the value of the unique identifier Adapty User Profile ID of the user, which can be found in the Adapty [Dashboard](profiles-crm). |
| `environment` | String | <p>Indicates whether the user is operating in a sandbox or production environment.</p><p></p><p>Values are either `Sandbox` or `Production`</p> |
| `store` | String | <p>Contains the name of the Store that used to make the purchase.</p><p></p><p>Possible values:</p><p>`app_store` or `play_store`.</p> |
| `vendor_product_id` | String | <p>Contains the value of Product Id in Apple/Google store.</p><p></p><p>e.g., org.locals.12345</p> |
| `subscription_expires_at` | String | <p>Contains the expiration date of the latest subscription.</p><p></p><p>Value format is:</p><p>YYYY-MM-DDTHH:mm:ss.SSS+TZ</p><p>e.g., 2023-02-15T17:22:03.000+0000</p> |
| `active_subscription` | String | The value will be set to `true` on any purchase/renewal event, or `false` if the subscription is expired. |
| `period_type` | String | <p>Indicates the latest period type for the purchase or renewal.</p><p></p><p>Possible values are</p><p>`trial` for a trial period or `normal` for the rest.</p> |


All float values will be rounded to int. Strings stay the same.

In addition to the pre-defined list of tags available, it is possible to send [custom attributes](segments#custom-attributes) using tags. This allows for more flexibility in the type of data that can be included with the tag and can be useful for tracking specific information related to a product or service. All custom user attributes are sent automatically to Braze if the user marks the ** Send user attributes** checkbox from [the integration page](https://app.adapty.io/integrations/braze)

## SDK Configuration

To link user profiles in Adapty and Braze you need to either configure Braze SDK with the same customer user ID as Adapty or use its `.changeUser()` method:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS (Swift)" default>
```swift showLineNumbers
let braze = Braze(configuration: configuration)
braze.changeUser(userId: "adapty_customer_user_id")
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>
```kotlin showLineNumbers
Braze.getInstance(context).changeUser("adapty_customer_user_id")
```
</TabItem>
</Tabs>