请求因某个字段中的错误而失败。

###### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）导致错误的字段</li><li> **errors**：（列表）错误列表。</li></ul> |
| error_code  | String  | 简短的错误名称。                                             |
| status_code | Integer | HTTP 状态码，始终为 `400`。                                  |

###### 响应示例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "string",
      "errors": [
        "string"
      ]
    }
  ],
  "error_code": "string",
  "status_code": 0
}
```