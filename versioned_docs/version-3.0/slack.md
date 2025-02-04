---
title: "Slack"
description: "Slack Integration with Adapty | Adapty Docs"
metadataTitle: "Integrate Slack with Adapty to receive real-time notifications about subscription events."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

[Slack](https://slack.com/) is a workplace messenger and productivity platform that probably needs no introduction.

With this integration, you'll be able to be notified in Slack each time a revenue event is tracked by Adapty. This can be helpful if you like to cherish every moment your MRR increases or if you'd like to be on the lookout for trial cancellations, billing issues, refunds, and more.

## How to set up Slack integration

You'll need to:

- create an app in your Slack workspace
- give it permission to post messages
- and then provide the necessary info to Adapty in [Integrations → Slack](https://app.adapty.io/integrations/slack).

### 1\. Create an app in Slack

1. Go to [Slack API dashboard](https://api.slack.com/apps) and create an app like so:


<Zoom>
  <img src={require('./img/f43aedc-CleanShot_2024-01-04_at_18.27.412x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/08fa9e6-CleanShot_2024-01-04_at_18.28.142x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Give it any name (`Adapty` for example) and add it to your workspace:


<Zoom>
  <img src={require('./img/5002bb1-CleanShot_2024-01-04_at_18.29.132x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### 2\. Give permission to post and get a token for your app

You'll be redirected to your app's page in Slack. 

1. Scroll down and click **Permissions**:


<Zoom>
  <img src={require('./img/9750451-CleanShot_2024-01-04_at_18.48.072x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. After the redirect, scroll down to **Scopes** and click **Add an OAuth Scope**:


<Zoom>
  <img src={require('./img/db5b5f4-CleanShot_2024-01-04_at_18.50.262x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





3. Give `chat:write`, `chat:write.public` and `chat:write.customize` permissions. Those are needed to post in your channels and customize the messages:


<Zoom>
  <img src={require('./img/d97ccb9-CleanShot_2024-01-04_at_18.51.572x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





4. Scroll back to the top of the page and click **Install to Workspace**:


<Zoom>
  <img src={require('./img/14608e3-CleanShot_2024-01-04_at_19.17.58.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





5. Click **Allow** here:


<Zoom>
  <img src={require('./img/143967e-CleanShot_2024-01-04_at_18.53.292x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





After this, you'll be redirected to the same page, but you'll have an OAuth Token available (`xoxb-...`). This is exactly what's needed to complete the setup:


<Zoom>
  <img src={require('./img/59b33ee-CleanShot_2024-01-04_at_18.55.222x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### 3\. Configure the integration in Adapty

1. Go to [**Integrations** → **Slack**](https://app.adapty.io/integrations/slack):


<Zoom>
  <img src={require('./img/b4ffd71-CleanShot_2024-01-04_at_19.05.222x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Paste the `xoxb-...` token from the previous step and choose which channels the app will post to. You can set up the integration to receive events only on production, sandbox or both. You can also choose which currency to post in (original or converted to USD).

  :::note
  Note that if you'd like to post messages from Adapty in a private channel, you'll need to manually add the `Adapty` app you've created in Slack to that channel. Otherwise, it would not work.
  :::

3. Finally, you can choose which events you'd like to receive under **Events**:


<Zoom>
  <img src={require('./img/970a7bb-CleanShot_2024-01-04_at_19.09.472x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






You're all set!

The events will be sent to the channels you've specified. You'll be able to see the revenue where applicable and view the customer profile in Adapty:



<Zoom>
  <img src={require('./img/852b8c8-CleanShot_2024-01-04_at_19.11.332x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

