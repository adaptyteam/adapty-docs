<!--- ProfileResponseUnauthorized.md --->

<p> </p>

The request failed because of improper or missed authorization. Refer to the [Authorization](server-side-api-specs#authorization) page and pay special attention to the **Authorization header**.

The request failed due to the fact that the defined profile is not found

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`</li><li> **errors**: Descriptive information about the error.</li></ul> |
| error_code  | String  | Short error name. Always `not_authenticated`                 |
| status_code | Integer | HTTP status. Always `401`                                    |

###### Response example

```json
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Authentication credentials were not provided."
      ]
    }
  ],
  "error_code": "not_authenticated",
  "status_code": 401
}
```
