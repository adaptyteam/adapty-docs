<!--- ProfileResponseNotFound.md --->

<p> </p>
The request failed because the specified profile wasn’t found. Double-check the `customer_user_id` or `profile_id` for any typos.

##### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `null`.</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `profile_does_not_exist`.           |
| status_code | Integer | HTTP status. Always `404`.                                   |

##### Response example

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Profile not found"
            ]
        }
    ],
    "error_code": "profile_does_not_exist",
    "status_code": 404
}
```

 

