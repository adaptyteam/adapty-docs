<!--- InvalidDateFormat --->

The request failed because the format of the `visited_at` field is incorrect. Use the **ISO 8601 date** format, e.g. `2025-01-14T14:15:22Z`.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `visited_at`.</li><li> **errors**: A description of the error. </li></ul> |
| error_code  | String  | Short error name. Here: `base_error`.                        |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json
{
    "errors": [
        {
            "source": "visited_at",
            "errors": [
                "invalid datetime format",
                "invalid datetime format"
            ]
        }
    ],
    "error_code": "datetime",
    "status_code": 400
}
```

 
