---
title: "Google Reduced Service Fee"
description: "Understand Google’s reduced service fee and how it impacts app revenue."
metadataTitle: "Google Reduced Service Fee Explained | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Learn how Adapty can help you manage your proceeds on Google Play Store, including the reduced service fee program for developers earning less than $1,000,000 USD annually. By following the necessary steps to join the program and updating your membership status in the Adapty Sashboard, you can ensure that your sales commission is accurately calculated, and you receive reliable information on your transactions.  
Adapty also supports the Small Business Program for App Store. You can reference [this document](app-store-small-business-program) for more details.

## Google's 15% Reduced Service Fee

Developers who earn less than $1,000,000 USD annually are eligible to join a reduced service fee tier offered by Google. Under this tier, the commission fee is lowered to 15% instead of the standard rate of 30%. Developers offering automatically renewing subscription products are eligible for a reduced service fee of 15%, independent of their participation in other programs offered by Google Play. You can read more about the service fees [here](https://support.google.com/googleplay/android-developer/answer/112622?hl=en).

To participate in the Google Play Reduced Service Fee program, you must have a payment profile and create an Account Group where your Developer Account is the Primary Developer Account. You also need to inform Google if you have any Associated Developer Accounts (ADAs) and link your account to the group. Once these steps are completed, you will automatically be enrolled in the program, and you'll be eligible for the reduced commission rate on your first $1,000,000 USD in revenue per year. For more detailed information on the necessary steps, please refer to Google's [documentation](https://support.google.com/googleplay/android-developer/answer/10632485).

## How Adapty calculates the proceeds Play Store

Adapty can accurately calculate your app's earnings by deducting Google's commissions and taking into account your eligibility for the Reduced Service Fee program.

In the Adapty Dashboard, the Reduced Service Fee membership status is assigned to each individual app based on the developer's representation of multiple apps from different companies in their account. This means that the eligibility for the program is determined on a per-app basis.

You can add multiple periods by selecting a range of dates for each period in the same field. The date range represents the start and end date of the period during which your business was a member of the Small Business Program. Please note that the Entry Date refers to the earliest date in the range when your business became a member of the program, and the Exit Date refers to the latest date in the range when your business officially left or was removed from the program.

You can select your entry date according to your preference. However, it's important to note that if you select a past date, any webhooks and integration events already processed will not be resent with corrected pricing data. To ensure the accuracy of pricing data sent to your integrations, it's advisable to set your effective entry date as soon as possible. This way, you can receive reliable and up-to-date information on your transactions and make informed decisions accordingly.

## Letting Adapty know

To manage your Reduced Service Fee membership status for Google Play, go to the **App Settings > General tab** in your Adapty account. Click the **Add period** button to specify your membership status for a specific period range. In the "Period" field, select a date range that indicates your business's membership start and end dates. This range can include any date in the past or the future. You can add additional membership periods by clicking on the "Add Period" button again.


<Zoom>
  <img src={require('./img/65d9968-CleanShot_2023-04-11_at_15.00.482x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





You can select your period start according to your preference. However, if you select a past period start, any webhooks and integration events already processed will not be resent with corrected pricing data. To ensure the accuracy of pricing data sent to your integrations, it's advisable to set your effective period start as soon as possible. This way, you can receive reliable and up-to-date information on your transactions and make informed decisions accordingly.

Please note that the Reduced Service Fee membership status will only apply to the specific period range you've specified. Once the period end is reached, you'll need to add another period if you want to continue with the  Reduced Service Fee membership status.

To ensure that we calculate your sales commission correctly, please enter the exit date in the Adapty Dashboard app settings as soon as possible if your business has left the Reduced Service Fee. If no exit date is provided, we will continue to calculate your commission based on the reduced rate.