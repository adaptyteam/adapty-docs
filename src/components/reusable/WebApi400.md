<!--- WebApi400 --->

The response means that either your request is not a valid JSON or some field is missing. Correct the JSON to make it valid and add the missing parameter.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Contains the field name you should check. For invalid JSON, it will be `null`.</li><li> **errors**: A description of the error. </li></ul> |
| error_code  | String  | Short error name. Possible value: `parse_error`or `base_error`. |
| status_code | Integer | HTTP status. Always `400`.                                   |

```json
{
    "errors": [
        {
            "source": "customer_user_id",
            "errors": [
                "field required"
            ]
        },
        {
            "source": null,
            "errors": [
                "JSON parse error - Expecting property name enclosed in double quotes: line 6 column 1 (char 73)"
            ]
        }
    ],
    "error_code": "parse_error",
    "status_code": 400
}
```