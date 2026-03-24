请求失败的原因可能是以下两种之一：[App Settings](https://app.adapty.io/settings/paddle) 中的 Paddle 凭据不正确，或者提供的令牌无效。请检查以下内容：

1. [App Settings](https://app.adapty.io/settings/paddle) 中的 **Paddle API Key** 正确无误，且属于正确的应用。
2. 您使用的 `paddle_token` 存在于该应用中，且请求中没有拼写错误。

#### Body \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 固定值为 `non_field_errors`。</li><li> **errors**: 错误描述。 </li></ul> |
| error_code  | String  | 简短的错误名称。可能的值：`invalid_paddle_credentials_or_purchase_not_found`。 |
| status_code | Integer | HTTP 状态码。固定值为 `400`。                                |

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