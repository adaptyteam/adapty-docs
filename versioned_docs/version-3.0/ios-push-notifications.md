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

![Choose Request a Certificate From a Certificate Authority](https://adapty-docs-assets.s3.amazonaws.com/gitbook/image%20%2895%29.webp)

Enter your email and name and save the certificate to a disk. It'll be named like _CertificateSigningRequest.certSigningRequest._ 

:::info
Create a folder to save all files in one place. For example, name it _Adapty Push Certificates_
:::

![Enter email, choose save to disk](https://adapty-docs-assets.s3.amazonaws.com/gitbook/image%20%282%29.webp)

### Create an Identity and Apple Certificate

Open [Apple Developer](https://developer.apple.com) and then [Certificates > Identifiers](https://developer.apple.com/account/resources/certificates/list).

![Identifiers](https://adapty-docs-assets.s3.amazonaws.com/gitbook/image%20%2893%29.webp)

Choose your identifier, activate Push Notifications, and hit Save.

![Activating Push Notifications](https://adapty-docs-assets.s3.amazonaws.com/gitbook/image%20%2896%29.webp)

:::warning
Do not configure/edit Push Notifications settings on the page above. It's legacy stuff. The method below allows you to create a certificate much easier.
:::

Go to Certificates section and start new certificate generation

![Creating a new certificate](https://adapty-docs-assets.s3.amazonaws.com/gitbook/image%20%285%29.webp)

Scroll down and select _Apple Push Notification service SSL \(Sandbox & Production\)_

![](https://adapty-docs-assets.s3.amazonaws.com/gitbook/image%20%2894%29.webp)

Choose your Identifier and upload a certificated generated on your Mac earlier 

![](https://adapty-docs-assets.s3.amazonaws.com/gitbook/image%20%2882%29.webp)

And download a certificate as _aps.cer_ file.

Open the _aps.cer_ file in the Keychain and export in as a p12 file.

![Export certificate as p12 file](https://adapty-docs-assets.s3.amazonaws.com/gitbook/image%20%2892%29.webp)

Please be sure that you choose Certificate category! Otherwise you can't export it a p12 file. Yeap, that's super weird.

The last thing, convert your p12 file to a plain text. Open terminal and enter a command

```text title="Text"
openssl pkcs12 -in cert.p12 -nodes > open_cert.p12
```

change _cert.p12_ to your file name.

And the last, upload a certificate to Adapty.

![Upload p12 certificate](https://adapty-docs-assets.s3.amazonaws.com/gitbook/image%20%2884%29.webp)