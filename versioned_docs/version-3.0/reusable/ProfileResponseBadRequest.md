<!--- ProfileResponseBadRequest.md --->

The request failed due to some error in a field

###### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Field that caused the error(s)</li><li> **errors**: (list) listed errors</li></ul> |
| error_code  | String  | Short error name                                             |
| status_code | Integer | HTTP status, always `400`                                    |

###### Response example

```json
{
  "errors": [
    {
      "source": "string",
      "errors": [
        "string"
      ]
    }
  ],
  "error_code": "string",
  "status_code": 0
}
```