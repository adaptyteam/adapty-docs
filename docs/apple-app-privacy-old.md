---
title: "Apple app privacy"
description: ""
metadataTitle: ""
---

Starting December 8, 2020, Apple requires a privacy disclosure for all new apps and app updates. Adapty is a third-party dependency to your app, therefore you’ll need to properly disclose the ways you are using Adapty in regards to user's data.

### Data types

✅ = Required  
👀 = May be required \(see details below\)  
❌ = Not required

| Data type | Required | Note |
|---------|--------|----|
| Identifiers | ✅ | <p>If you are identifying users with a customerUserId, select 'User ID'.</p><p></p><p>Adapty collects IDFA, so you have to select 'Device ID'.</p> |
| Purchases | ✅ | Adapty collects purchase history from users. |
| Contact Info, including name, phone number, or email address | 👀 | Required if you pass personal data like name, phone number, or email address using **`updateProfile`** method. |
| Usage Data | 👀 | If you are using analytics SDK's such as Amplitude, Mixpanel, AppMetrica, or Firebase, this may be required. |
| Location | ❌ | Adapty does not collect precise location data. |
| Health & Fitness | ❌ | Adapty does not collect health or fitness data from users. |
| Sensitive Info | ❌ | Adapty does not collect sensitive information. |
| User Content | ❌ | Adapty does not collect content from users. |
| Diagnostics | ❌ | Adapty does not collect device diagnostic information. |
| Browsing History | ❌ | Adapty does not collect browsing history from users. |
| Search History | ❌ | Adapty does not collect search history from users. |
| Contacts | ❌ | Adapty does not collect contact lists from users. |
| Financial Info | ❌ | Adapty does not collect financial info from users. |


### Required data types

#### Purchases

When using Adapty, you must disclose that your app collects ‘Purchases’ information.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/feb3b9f-CleanShot_2023-08-25_at_12.32.552x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





#### Identifiers

If you are identifying users with **`customerUserId`**, you'll need to select 'User ID'.

Adapty collects IDFA, so you'll need to select 'Device ID'.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/93f3daa-CleanShot_2023-08-25_at_12.35.272x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





After making your selections, you'll need to indicate how the data is used similar to the Purchases section.

After making your privacy selections, Apple will show a preview of your app's privacy section. If you have chosen Purchases and Identifiers as described above, your app's privacy details should look something like this:


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/17e4ba7-CleanShot_2023-08-25_at_12.36.442x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>


