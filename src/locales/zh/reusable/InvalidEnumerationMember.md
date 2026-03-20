请求失败，因为 `status` 字段的值无效。请检查是否存在拼写错误。可能的值为 `organic`、`non_organic` 和 `unknown`。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）固定为 `status`。</li><li> **errors**：错误描述。此处为 `value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'`</li></ul> |
| error_code  | String  | 简短错误名称。此处为 `enum`。                                |
| status_code | Integer | HTTP 状态码。固定为 `400`。                                  |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
    "errors": [
        {
            "source": "status",
            "errors": [
                "value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'"
            ]
        }
    ],
    "error_code": "enum",
    "status_code": 400
}
```