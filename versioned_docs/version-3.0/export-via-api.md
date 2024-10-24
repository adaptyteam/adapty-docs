---
title: "Exporting analytics to CSV with API"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you need to download analytics into csv file, you can use Adpty API to do so.

## Import request collection to Postman

1. In Postman, click the **Import** button.
3. Drag-and-drop the **client-api.yaml** file into Postman.
4. Select the **Import to Postman collection** radio-button.
5. Click **Import**.

## Authorization

- **Base URL**: https://[api-admin.adapty.io](http://api-admin.adapty.io/)
- **Authorization header**: API requests must be authenticated by including your secret API key as an **Authorization** header.
  
  1. In the **Authorization** -> **Auth type** field, choose **API Key**.
  
  <Zoom>
    <img src={require('./img/auth-type.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>
  
  2. In the **Value** field, enter the API Key in format `Api-Key {secret_token}` to each request, for example, `Api-Key secret_live_BEHrYLTr.ce5zuDEWz06lFRNiaJC8mrLtL8fUwswD`. You can find your secret API key in [Adapty Dashboard -> **App Settings** -> **General** tab API -> **API keys** section](https://app.adapty.io/settings/general). This key is secret, so be careful not to share it publicly.
- **Content-Type header**: The API expects the request to use the **Content-Type** header set to `application/json`.
- **Body**:  The API expects the request to use the body as JSON.



