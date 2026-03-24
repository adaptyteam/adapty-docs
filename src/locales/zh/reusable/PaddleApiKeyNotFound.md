请求失败，因为 [App Settings](https://app.adapty.io/settings/paddle) 中的 **Paddle API Key** 不正确。请验证其准确性以及是否与正确的应用关联。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）始终为 `non_field_errors`。</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 错误简称。可能的值：`paddle_api_key_not_found`。             |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paddle API key not found"
      ]
    }
  ],
  "error_code": "paddle_api_key_not_found",
  "status_code": 400
}
```