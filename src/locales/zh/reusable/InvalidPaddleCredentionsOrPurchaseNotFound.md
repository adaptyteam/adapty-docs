 

请求失败的原因可能有两种：[App Settings](https://app.adapty.io/settings/paddle) 中的 Paddle 凭证不正确，或提供的 token 无效。请检查以下内容：

1. [App Settings](https://app.adapty.io/settings/paddle) 中的 **Paddle API Key** 正确无误，且属于正确的应用。
2. 你使用的 `paddle_token` 在该应用中存在，且请求中没有拼写错误。

#### 响应体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）固定为 `non_field_errors`。</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 简短的错误名称。可能的值：`invalid_paddle_credentials_or_purchase_not_found`。 |
| status_code | Integer | HTTP 状态码。固定为 `400`。                                  |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Invalid Paddle credentials or purchase not found"
      ]
    }
  ],
  "error_code": "invalid_paddle_credentials_or_purchase_not_found",
  "status_code": 400
}
```

