<!--- VariationIdNotFound --->

The request failed because the `variation_ID` for the requested paywall couldn’t be found. Check that the `placement_id` you’re requesting exists in the app and that there are no typos in it in your request.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `bull`.</li><li> **errors**: A description of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `VARIATION_DOES_NOT_EXIST_ERROR`. |
| status_code | Integer | HTTP status. Always `404`.                                   |

#### Response example

```JSON
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Variation for example_onboarding does not exist."
            ]
        }
    ],
    "error_code": "VARIATION_DOES_NOT_EXIST_ERROR",
    "status_code": 404
}
```

