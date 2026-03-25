请求失败，因为您在请求中定义的 `revoke_at` 晚于当前访问等级的 `expires_at` 参数。如果您想延长访问等级，请使用[授予访问等级](ss-grant-access-level)请求。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）始终为 `non_field_errors`</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 错误简称。始终为 `revocation_date_more_than_expiration_date`。 |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例 \{#response-example\}

```json showLineNumbers
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