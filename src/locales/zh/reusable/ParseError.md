该响应表示您的请求不是有效的 JSON，或某些字段缺失。请更正 JSON 使其有效，并添加缺失的参数。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）对于无效的 JSON，其值为 `null`。</li><li> **errors**：错误的描述信息。</li></ul> |
| error_code  | String  | 错误简称。此处为：`parse_error`。                            |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "JSON parse error - Expecting ',' delimiter: line 4 column 3 (char 67)"
            ]
        }
    ],
    "error_code": "parse_error",
    "status_code": 400
}
```