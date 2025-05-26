---
title: "Google Play Data Safety"
description: "Ensure compliance with Google Play Data Safety policies in Adapty."
metadataTitle: "Google Play Data Safety Compliance | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Data Safety section available on Google Play provides a simple method for app developers to inform users about the data collected or shared by their app, as well as highlight their app's critical privacy and security measures. This information enables users to make more informed decisions when selecting which apps to download and use.

Here is a short guide on data that Adapty collects to help you provide the required information to Google Play.

## Data Collection and Security


<Zoom>
  <img src={require('./img/3508c24-image4.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





**Does your app collect or share any of the required user data types?**  
Select 'Yes' as Adapty collects a customer's purchase history.

**Is all of the user data collected by your app encrypted in transit?**  
Select 'Yes' as  Adapty encrypts data in transit.

**Do you provide a way for users to request that their data is deleted?**  
If selecting 'Yes', ensure your customers have a way to contact your support team to request a data deletion. You will be able to delete the customer directly from the Adapty dashboard or via REST API.

## Data Types

Here is a list of the data types that Google requires for reporting, and we have specified whether Adapty collects any particular type of data.

| Data Type                     | Details                                                                                                                                                              |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location                      | Is not collected by Adapty                                                                                                                                           |
| Health and Fitness            | Is not collected by Adapty                                                                                                                                           |
| Photos and Videos             | Is not collected by Adapty                                                                                                                                           |
| Files and Docs                | Is not collected by Adapty                                                                                                                                           |
| Calendar                      | Is not collected by Adapty                                                                                                                                           |
| Contacts                      | Is not collected by Adapty                                                                                                                                           |
| User Content                  | Is not collected by Adapty                                                                                                                                           |
| Browsing History              | Is not collected by Adapty                                                                                                                                           |
| Search History                | Is not collected by Adapty                                                                                                                                           |
| App Info and Performance      | Is not collected by Adapty                                                                                                                                           |
| Web Browsing                  | Is not collected by Adapty                                                                                                                                           |
| Contact Info                  | Is not collected by Adapty                                                                                                                                           |
| Financial Info                | Adapty collects purchase history from users                                                                                                                          |
| Personal Info and Identifiers | Adapty collects User ID and some other identifiable contact information including name, email address, phone number, etc, if you explicitly pass them to Adapty SDK. |
| Device and other identifiers  | Adapty collects data on device id.                                                                                                                                   |

## Data usage and handling

### User IDs

**1. Is this data collected, shared, or both?**  
This data is collected by Adapty. If you are using integrations set up between Adapty and third parties that are not considered service providers, you may need to disclose "Shared" here as well.  
**2. Is this data processed ephemerally?**  
Select 'No'.  
**3. Is this data required for your app, or can users choose whether it's collected?**  
This data collection is required and cannot be turned off.


<Zoom>
  <img src={require('./img/2c60161-image5.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





**4. Why is this user data collected? / Why is this user data shared?**  
Select the 'App functionality' and 'Analytics' checkboxes.


<Zoom>
  <img src={require('./img/07a3c9e-image2.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Financial Info

If you are using Adapty, you must disclose that your app collects 'Purchase history' information from the Data types section in Google Play Console. 


<Zoom>
  <img src={require('./img/1057870-image7.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Device or other IDs


<Zoom>
  <img src={require('./img/d10f132-CleanShot_2023-03-01_at_17.55.312x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/ccb1a2a-image5.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Next Steps

Once you have made your data safety selections, Google will display a preview of your app's privacy section. If you have opted for "Financial Info" and "Device or other IDs" as mentioned earlier, your privacy information should appear similar to the following example


<Zoom>
  <img src={require('./img/e8d9b73-image3.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





If you are prepared to submit your app for App Review, please refer to our [Release Checklist](release-checklist) document for further guidance on preparing your app for submission.