<!--- RevocationDateIsMoreThanExpirationDate.md --->

The request failed because the `revoke_at` you defined in the request is later than the current access level `expires_at` parameter. If you want to prolong the access level, use the [Grant access level](ss-grant-access-level) request.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Always `non_field_errors`</li><li> **errors**: A description of the error.</li></ul> |
| error_code  | String  | Short error name. Always `revocation_date_more_than_expiration_date`. |
| status_code | Integer | HTTP status. Always `400`.                                   |

#### Response example

```json
  {
  "errors": [
    {
      "source": "revoke_at",
      "errors": [
        "Revocation date (2029-08-29 09:33:42+00:00) is more than current expiration date (2028-08-29 09:33:42+00:00)"
      ]
    }
  ],
  "error_code": "revocation_date_more_than_expiration_date",
  "status_code": 400
}
```

 