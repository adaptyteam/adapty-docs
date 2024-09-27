<!--- AccessLevelProfileNotFound.md --->

<p> </p>

---

#### Profile not found

The request failed because the profile defined in the request was not found. Review that your request does not contain typos in `profile_id` and that it belongs to the correct app.

###### Parameters

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | Buletted: <ul><li> **source**: (string) Always `non_field_errors`</li><li> **errors**: Descriptive name of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `profile_does_not_exist    |
| status_code | Integer | HTTP status. Always `404`                                    |

###### Response example

The profile is not found

```json
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