

The response means that either your request is not a valid JSON or some field is missing. Correct the JSON to make it valid and add the missing parameter.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) For invalid JSON, it will be `null`.</li><li> **errors**: A description of the error. </li></ul> |
| error_code  | String  | Short error name. Here: `parse_error`.                       |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "JSON parse error - Expecting ',' delimiter: line 4 column 3 (char 67)"
            ]
        }
    ],
    "error_code": "parse_error",
    "status_code": 400
}
```
