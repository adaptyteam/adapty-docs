请求失败，因为指定的撤销日期已过期。请将 `revoke_at` 设置为未来的日期，或设置为 `null` 以立即撤销访问权限。

##### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）始终为 `revoke_at`。</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 错误简称。始终为 `value_error`。                             |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

##### 响应示例

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Must be greater than the current time or null"
            ]
        }
    ],
    "error_code": "value_error",
    "status_code": 400
}
```