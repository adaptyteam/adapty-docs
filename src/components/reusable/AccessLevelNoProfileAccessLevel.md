<!--- AccessLevelNoProfileAccessLevel.md --->

The request failed because the profile in the request doesn’t match the specified access level. Double-check that the profile ID in the header and the access level ID in the body are correct, and make sure there are no typos.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `profile_paid_access_level_does_not_exist`. |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile `478b2e7f-d557-4b8b-9c5f-cbd46fc2dee2` has no `premium` access level"
      ]
    }
  ],
  "error_code": "profile_paid_access_level_does_not_exist",
  "status_code": 400
}
```

 