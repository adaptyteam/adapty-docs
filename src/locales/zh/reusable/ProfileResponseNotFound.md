<p> </p>
请求失败，因为未找到指定的用户画像。请仔细检查 `customer_user_id` 或 `profile_id` 是否有拼写错误。

##### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）始终为 `null`。</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 简短的错误名称。始终为 `profile_does_not_exist`。            |
| status_code | Integer | HTTP 状态码。始终为 `404`。                                  |

##### 响应示例

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