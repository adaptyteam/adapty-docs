---
title: "Edit product"
description: "Modify and manage your subscription products in Adapty for better revenue tracking."
metadataTitle: "Editing Products in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In Adapty, you can edit your product's name, access level, regional pricing, and connected store IDs. Subscription duration is not editable after you create the product, so you need to create a new product to change it.

:::warning
While you can edit any product, it's crucial to ensure that making changes to products already used in live paywalls doesn't lead to discrepancies in your analytics.

**Editing access level, App Store Product ID, and Play Store Product ID is not recommended** because it may affect analytics clarity. Only edit them if you made a mistake, like a typo in the product ID.

If you no longer use the product and want to replace it with another one, we strongly advise you to create a new product and update Paywalls and A/B tests accordingly.
:::

## Edit product

To edit the product:

1. Go to **[Products](https://app.adapty.io/products)** from the Adapty main menu.
2. Click the product row in the table or click three-dots next to the product and select **Edit**.
3. In the opened **Edit** window, make the changes you need. For more details on the options in this window, please read the [Create product](create-product) section.
4. Click **Save**.

:::important
If you edit the subscription duration or delete a product in App Store Connect or Google Play Console, the changes won't be automatically reflected in the Adapty dashboard, so, for data consistency, you should make the changes in both places at the same time or create a new product.
:::

<Zoom>
  <img src={require('./img/edit-product.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Set country-specific prices

You can set different prices for different regions right in the Adapty dashboard, and these country-specific prices will be applied to your products in App Store Connect and/or Google Play Console automatically.

To set country-specific prices:

1. [Open the product for editing](#edit-product).
2. Click **Download** to get your current prices exported from stores in the correct format or create a new CSV file.
[screenshot]
3. Update prices in the CSV file. Stick to the [format](#csv-file-format). If you leave a price for any country unchanged or don't include it in the file at all, nothing will happen. When you upload the CSV, Adapty compares prices and updates only those that differ.
4. In the **Edit** window, click **Upload** and select the CSV file.
[screenshot]
5. If you want the changes to be active for existing subscribers as well, select **Apply to existing subscribers**.
[screenshot]
6. Review the changes that will be applied and click **Save changes**.
[screenshot]

### CSV file format

:::tip
You can reuse the same CSV file if you have similar products in one app or if you want to set the same prices across different apps.
:::

The easiest way to edit prices in CSVs is to [download a file with current prices and edit it directly](#set-country-specific-prices).

However, if you are doing it yourself, your file must contain the following columns:
- `region_name`
- `region_code`
- `app_store_currency`
- `app_store_price`
- `play_store_currency`
- `play_store_price`

Example:
```
region_name,region_code,app_store_currency,app_store_price,play_store_currency,play_store_price
United States,US,,8.99,,8.99
United Arab Emirates,AE,USD,8.99,AED,39.99
Germany,DE,USD,8.99,USD,8.99
```