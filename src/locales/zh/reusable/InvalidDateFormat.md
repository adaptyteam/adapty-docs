
请求失败，因为 `visited_at` 字段的格式不正确。请使用 **ISO 8601 日期**格式，例如 `2025-01-14T14:15:22Z`。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）始终为 `visited_at`。</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 错误简称。此处为：`base_error`。                             |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例

```json showLineNumbers
{
    "errors": [
        {
            "source": "visited_at",
            "errors": [
                "invalid datetime format"
            ]
        }
    ],
    "error_code": "datetime",
    "status_code": 400
}
```

 
