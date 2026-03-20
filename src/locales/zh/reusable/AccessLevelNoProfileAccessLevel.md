请求失败，因为请求中的用户画像与指定的访问等级不匹配。请仔细检查请求头中的用户画像 ID 和请求体中的访问等级 ID 是否正确，并确保没有拼写错误。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 始终为 `non_field_errors`</li><li> **errors**: 错误描述。</li></ul> |
| error_code  | String  | 简短错误名称。始终为 `profile_paid_access_level_does_not_exist`。 |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile `478b2e7f-d557-4b8b-9c5f-cbd46fc2dee2` has no `premium` access level"
      ]
    }
  ],
  "error_code": "profile_paid_access_level_does_not_exist",
  "status_code": 400
}
```