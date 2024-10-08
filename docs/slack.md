---
title: "Slack"
description: ""
metadataTitle: ""
---

[Slack](https://slack.com/) is a workplace messenger and productivity platform that probably needs no introduction.

With this integration, you'll be able to be notified in Slack each time a revenue event is tracked by Adapty. This can be helpful if you like to cherish every moment your MRR increases or if you'd like to be on the lookout for trial cancellations, billing issues, refunds, and more.

## How to set up Slack integration

You'll need to:

- create an app in your Slack workspace
- give it permission to post messages
- and then provide the necessary info to Adapty in [Integrations → Slack](https://app.adapty.io/integrations/slack).

### 1\. Create an app in Slack

Go to https://api.slack.com/apps and create an app like so:


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/f43aedc-CleanShot_2024-01-04_at_18.27.412x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/08fa9e6-CleanShot_2024-01-04_at_18.28.142x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





Give it any name ("Adapty" for example) and add it to your workspace:


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/5002bb1-CleanShot_2024-01-04_at_18.29.132x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





### 2\. Give permission to post and get a token for your app

You'll be redirected to your app's page in Slack. Scroll down and press Permissions:


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/9750451-CleanShot_2024-01-04_at_18.48.072x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





After the redirect, scroll down to Scopes and press "Add an OAuth Scope":


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/db5b5f4-CleanShot_2024-01-04_at_18.50.262x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





Give `chat:write`, `chat:write.public` and `chat:write.customize` permissions. Those are needed to post in your channels and customize the messages:


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/d97ccb9-CleanShot_2024-01-04_at_18.51.572x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





Scroll back to the top of the page and press "Install to Workspace":


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/14608e3-CleanShot_2024-01-04_at_19.17.58.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





Press "Allow" here:


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/143967e-CleanShot_2024-01-04_at_18.53.292x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





After this, you'll be redirected to the same page, but you'll have an OAuth Token available (`xoxb-...`). This is exactly what's needed to complete the setup:


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/59b33ee-CleanShot_2024-01-04_at_18.55.222x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





### 3\. Configure the integration in Adapty

Go to [**Integrations** → **Slack**](https://app.adapty.io/integrations/slack):


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/b4ffd71-CleanShot_2024-01-04_at_19.05.222x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





Paste the `xoxb-...` token from the previous step and choose which channels the app will post to. You can set up the integration to receive events only on production, sandbox or both. You can also choose which currency to post in (original or converted to USD).

:::note
Note that if you'd like to post messages from Adapty in a private channel, you'll need to manually add the "Adapty" app you've created in Slack to that channel. Otherwise it would not work.
:::

 Finally, you can choose which events you'd like to receive under "Events":


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/970a7bb-CleanShot_2024-01-04_at_19.09.472x.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





:::info
You're all set!

The events will be sent to the channels you've specified. You'll be able to see the revenue where applicable and view the customer profile in Adapty:
:::


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/852b8c8-CleanShot_2024-01-04_at_19.11.332x.png" 
    style={{ width: '7px', border: 'none' }}
  />
</div>

