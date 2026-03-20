<p> </p>

请求失败，因为在请求头中未找到对应的用户画像。请仔细检查请求头中输入的 `profile_id` 或 `customer_user_id` 是否存在拼写错误，并确认其对应的应用是否正确。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 始终为 `non_field_errors`</li><li> **errors**: 错误描述。 </li></ul> |
| error_code  | String  | 简短的错误名称。可能的值：`profile_does_not_exist`。         |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例

未找到用户画像

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile not found"
      ]
    }
  ],
  "error_code": "profile_does_not_exist",
  "status_code": 400
}
```