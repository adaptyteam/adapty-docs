---
title: "App Store Small Business Program"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Learn about how Adapty calculates proceeds for both the App Store and Google Play Store, taking into account the reduced commission rate offered by the Small Business Program. Also, you can check the instructions on how to manage your Small Business Program membership status for the App Store in the Adapty Dashboard. By keeping your membership status up to date, you can ensure that Adapty accurately calculates your sales commission and provides reliable information on your transactions. 

Adapty also supports the reduced service fee program for Google Play. You can reference [this document](google-reduced-service-fee) for more details.

## App Store Small Business Program

The App Store Small Business Program is a scheme that reduces the commission on App Store sales for eligible small businesses from 30% to 15%. The program is available to developers who earn less than $1 million in annual App Store revenue, subject to certain eligibility criteria. Further information about the program can be found on the App Store Small Business Program [page](https://developer.apple.com/app-store/small-business-program/).

Acknowledging your membership in the Small Business Program in your app settings is essential, as the reduced commission rate will impact the data sent for integrations and the information displayed in Adapty's charts. By providing this information through Adapty, you can simplify the enrollment process and take advantage of the reduced commission rate offered by the program.

To join the App Store Small Business Program, the first step is to visit the [Apple Developer website](https://developer.apple.com/app-store/small-business-program/). Before applying, please make sure that you are the Account Holder in the Apple Developer Program, have accepted the latest Paid Applications contract in App Store Connect, and can list all associated developer accounts to the account for which you are applying.

After reviewing the program's terms, click the 'Enroll' button and sign in to your Apple Developer account. Apple's enrollment form will automatically fill in information like your name, email, and Team ID. After submitting your enrollment form, Apple will review your application. Once your enrollment is processed, you will receive a confirmation email that your enrollment is being reviewed.

## How Adapty calculates the proceeds App Store

Adapty can accurately calculate your app's earnings by deducting Apple's and Google's commissions and taking into account your eligibility for the Small Business Program.

In the Adapty Dashboard, the Small Business Program membership status is assigned to each individual app based on the developer's representation of multiple apps from different companies in their account. This means that the eligibility for the program is determined on a per-app basis.

You can add multiple periods by selecting a range of dates for each period in the same field. The date range represents the start and end date of the period during which your business was a member of the Small Business Program. Please note that the Entry Date refers to the earliest date in the range when your business became a member of the program, and the Exit Date refers to the latest date in the range when your business officially left or was removed from the program.

You can select your entry date according to your preference. However, it's important to note that if you select a past date, any webhooks and integration events already processed will not be resent with corrected pricing data. To ensure the accuracy of pricing data sent to your integrations, it's advisable to set your effective entry date as soon as possible. This way, you can receive reliable and up-to-date information on your transactions and make informed decisions accordingly.

## Letting Adapty know

To manage your Small Business Program membership status for the App Store, go to the [**App Settings > General tab**](https://app.adapty.io/account) in your Adapty account. Click the **Add period** button to specify your membership status for a specific period range. In the "Period" field, select a date range that indicates your business's membership start and end dates. This range can include any date in the past or the future.

You can add additional membership periods by clicking on the "Add Period" button again.


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

Please note that the Small Business Program membership status will only apply to the specific period range you've specified. Once the period end is reached, you'll need to add another period if you want to continue with the Small Business Program membership status.

To ensure that we calculate your sales commission correctly, please enter the effective exit date in your Adapty Dashboard app settings as soon as possible if your business has left the Small Business Program. If no exit date is provided, we will continue to calculate your commission based on the reduced rate.