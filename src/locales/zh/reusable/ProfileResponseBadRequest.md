
由于某个字段出现错误，请求失败。

###### 请求正文 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）导致错误的字段</li><li> **errors**：（list）错误列表。</li></ul> |
| error_code  | String  | 错误简称。                                                   |
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