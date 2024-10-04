<!--- AccessLevelDoesNotExist.md --->





The request failed because the access level defined in the request was not found. Review that your request does not contain typos in the `access_level_id` and that it belongs to the correct app.

###### Parameters

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`</li><li> **errors**: Descriptive name of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `paid_access_level_does_not_exist` |
| status_code | Integer | HTTP status. Always `404`                                    |

###### Response example

The access level is not found

```json
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