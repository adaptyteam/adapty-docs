<!--- ValueError --->

The request failed because the specified revocation date is in the past. Set `revoke_at` to a future date or `null` to revoke access immediately.

##### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `revoke_at`.</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `value_error`.                      |
| status_code | Integer | HTTP status. Always `400`.                                   |

##### Response example

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Must be greater than the current time or null"
            ]
        }
    ],
    "error_code": "value_error",
    "status_code": 400
}
```

 

