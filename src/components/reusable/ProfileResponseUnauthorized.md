<!--- ProfileResponseUnauthorized.md --->

<p> </p>

The request failed due to missing or incorrect authorization. Check the [Authorization](ss-authorization) page, paying close attention to the **Authorization header**.

The request also failed because the specified profile wasn’t found.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`.</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `not_authenticated`.                |
| status_code | Integer | HTTP status. Always `401.`                                   |

#### Response example

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

 
