---
title: "Push Notifications"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you want to use [promo campaigns](promo-campaigns), you will need to generate a certificate for sending push notifications. It takes several steps to generate and may take about 15 minutes.

### Create a signing certificate

Open Keychain Access and on the upper menu choose _Keychain Access > Certificate Assistant -> Request a Certificate From a Certificate Authority._

<Zoom>
  <img src={require('./img/push1.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Enter your email and name and save the certificate to a disk. It'll be named like _CertificateSigningRequest.certSigningRequest._ 

:::info
Create a folder to save all files in one place. For example, name it _Adapty Push Certificates_
:::

<Zoom>
  <img src={require('./img/push2.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Create an Identity and Apple Certificate

Open [Apple Developer](https://developer.apple.com) and then [Certificates > Identifiers](https://developer.apple.com/account/resources/certificates/list).

<Zoom>
  <img src={require('./img/push3.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Choose your identifier, activate Push Notifications, and hit Save.

<Zoom>
  <img src={require('./img/push4.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::warning
Do not configure/edit Push Notifications settings on the page above. It's legacy stuff. The method below allows you to create a certificate much easier.
:::

Go to Certificates section and start new certificate generation

<Zoom>
  <img src={require('./img/push5.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Scroll down and select _Apple Push Notification service SSL \(Sandbox & Production\)_

<Zoom>
  <img src={require('./img/push6.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Choose your Identifier and upload a certificated generated on your Mac earlier 

<Zoom>
  <img src={require('./img/push7.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

And download a certificate as _aps.cer_ file.

Open the _aps.cer_ file in the Keychain and export in as a p12 file.

<Zoom>
  <img src={require('./img/push8.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Please be sure that you choose Certificate category! Otherwise you can't export it a p12 file. Yeap, that's super weird.

The last thing, convert your p12 file to a plain text. Open terminal and enter a command

```text title="Text"
openssl pkcs12 -in cert.p12 -nodes > open_cert.p12
```

change _cert.p12_ to your file name.

And the last, upload a certificate to Adapty.

<Zoom>
  <img src={require('./img/push9.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>