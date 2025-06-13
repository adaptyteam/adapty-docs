<!--- NoProductsFound.md --->

The request failed because the products linked to the provided token were not found. Please ensure that all required products are added to the correct app in Adapty and that their **Paddle Product ID** and **Paddle Price ID** are correctly filled in.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`.</li><li> **errors**: A description of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `no_products_found`.       |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```JSON showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "No products found for purchase"
      ]
    }
  ],
  "error_code": "no_products_found",
  "status_code": 400
}
```

