<!--- AccessLevelDoesNotExist.md --->





The request failed because the access level in the request couldn’t be found. Double-check that there are no typos in the `access_level_id` and that it matches the correct app.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Possible value: `paid_access_level_does_not_exist`. |
| status_code | Integer | HTTP status. Always `404`.                                   |

#### Response example

The access level was not found.

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paid access level `premium` does not exist"
      ]
    }
  ],
  "error_code": "paid_access_level_does_not_exist",
  "status_code": 400
}
```