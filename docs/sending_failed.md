---
title: "Troubleshooting on integration event sending failures"
description: ""
metadataTitle: ""
---

After you set up an integration, there are 2 ways you can learn about issues with sending events:

1. The **Sending failed** status in the **Last sent events** table on the integration page.

   
<img
  src={require('./img/879070c-sending_failed.png').default}
/>



2. The red name of the integration in the [**Event Feed**](https://app.adapty.io/event-feed).

   
<img
  src={require('./img/863e36b-red_integrations.png').default}
/>




In both cases, the system displays the statuses of integrations that are enabled for the app, regardless of whether the event type is enabled or disabled for a specific integration. The **Event feed** shows the events for the last 2 weeks.

**Color-coding of the status**

| Color | Description                                                                               |
| :---- | :---------------------------------------------------------------------------------------- |
| grey  | The event type is disabled for a particular integration,                                  |
| red   | There are some issues with the integration. Your attention is required to solve the issue |

To learn the exact issue, hover over the red text. The system will show the issue that caused the integration event sending failure. 


<img
  src={require('./img/54d5219-hover_sending_failed.png').default}
/>





Please see our recommendations on every cause of the **Sending failed** status below.

If the event did not appear on the list at all, your purchase did not occur and therefore the event was not created.. In this case, refer to the [Troubleshooting test purchases](troubleshooting-test-purchases)   topic for the solution.

## Integration event sending failure issues and solutions

Please be aware that we determine the deliverability based on HTTP status and consider everything **outside the 200-399 range** to be a fail. 

| Issue | Possible reason | Solution |
|-----|---------------|--------|
| Failed to send the event for integration due to a network error | No internet connection | Restore your internet connection. Adapty will resend the event. |
| Integration server failed to process the event | <p>1. The integration is set up incorrectly, for example:1.1. Webhook integration URL is incorrect</p><p>1.2. Dev Keys are incorrect</p><p>2. Receiving server is set up incorrectly and cannot receive/ accept the event notification</p> | <p>Refer to the corresponding documentation topic on the failed integration in our documentation and recheck integration configuration steps:</p><p>1.1.</p><p>1.2.</p><p>2.</p> |
| Missing integration credentials in the dashboard |  |  |
| Missing some integration data | <p>1. The profile is missing some dedicated ID due to SDK misconfiguration - check the doc.</p><p>2. For Aapty and some others - the profile must have attribution and be created after the integration was configured.</p> |  |
| The event expired and the integration is not possible | <p>The **Exclude historical** events option is enabled in the integration settings, and the event's creation date precedes the profile creation date in our system.</p><p></p><p>This can happen if a chain of transactions starting many years ago comes to Adapty through receipt validation for a profile created recently.</p> |  |
| The event type is disabled or not supported for the integration | <p>This means that either the vent is never sent to this type of integration you you have disabled it when setting up the integration.</p><p>To enable the event for the integration:</p><p></p><p>1. Open [**Integrations**](https://app.adapty.io/integrations/customwebhook)  in your Adapty Dashboard and choose the integration you need.</p><p>2. Select the checkbox next to the event you wish to receive notifications for in the **Events names** section.</p><p>3. Click the **Save** button to confirm the changes.</p> |  |
| The user profile is missing the required integration data |  |  |