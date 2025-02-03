<!--- AccessLevelProfileNotFound.md --->

<p> </p>

The request failed because the profile in the request header wasn’t found. Double-check that there are no typos in the `profile_id` or `customer_user_id` you entered in the request header, and make sure it’s for the correct app.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`</li><li> **errors**: A description of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `profile_does_not_exist`.  |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

The profile is not found

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile not found"
      ]
    }
  ],
  "error_code": "profile_does_not_exist",
  "status_code": 400
}
```

 