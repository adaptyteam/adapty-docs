<!--- ProfileResponseNotFound.md --->

<p> </p>
The request failed because the specified profile wasn’t found.

##### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `not_found`.                        |
| status_code | Integer | HTTP status. Always `404`.                                   |

##### Response example

```json
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Not found."
      ]
    }
  ],
  "error_code": "not_found",
  "status_code": 404
}
```

 

