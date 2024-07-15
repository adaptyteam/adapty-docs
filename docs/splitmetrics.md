---
title: "SplitMetrics Acquire"
description: ""
metadataTitle: ""
---

With [SplitMetrics Acquire ](https://splitmetrics.com/acquire/)integration, you can see exactly how much money your Apple Search Ads make from subscriptions. And you can track your users for months to know how much money your ads make over time.

In addition, Adapty sends [subscription events](https://docs.adapty.io/docs/events) to SplitMetrics Acquire so that you can build custom dashboards and automation there, based on Apple Search Ads attribution.  
It doesn't add any attribution data to Adapty, as we already have everything we need from ASA directly.

## How to set up SplitMetrics Acquire integration

To integrate SplitMetrics Acquire go to [Integrations > SplitMetrics Acquire](https://app.adapty.io/integrations/splitmetrics) and set credentials.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/8255349-CleanShot_2023-08-14_at_17.39.422x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





Open your SplitMetrics Acquire account, hover over one of the MMP logos and click the appeared **Settings** button. Find your Client ID in the dialog under item 5, copy it, and then paste it to Adapty as Client ID.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/4d0b2b6-Adapty.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/4f8d0b8-AdaptyGuide.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





You will also have to set Apple App ID to use the integration. To find App ID, open your app page in App Store Connect, go to the App Information page in section General and find Apple ID in the left bottom part of the screen.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/61578ee-CleanShot_2022-04-20_at_17.55.03.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





## Events and tags

Below the credentials, there are three groups of events you can send to SplitMetrics Acquire from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](https://docs.adapty.io/docs/events).


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/1b0c777-CleanShot_2023-08-11_at_14.56.362x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





We recommend using the default event names provided by Adapty. But you can change the event names based on your needs. Adapty will send subscription events to SplitMetrics Acquire using a server-to-server integration, allowing you to view all subscription events in your SplitMetrics dashboard.

## SDK configuration

You don't have to configure anything on the SDK side, but we recommend sending `customerUserId` to Adapty for better accuracy.

:::warning
Make sure you've configured [Apple Search Ads](https://docs.adapty.io/docs/apple-search-ads) in Adapty and [uploaded credentials](https://app.adapty.io/settings/apple-search-ads), without them, SplitMetrics Acquire won't work.
:::