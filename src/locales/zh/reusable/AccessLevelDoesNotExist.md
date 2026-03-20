请求失败，因为在请求中找不到对应的访问等级。请仔细检查 `access_level_id` 中是否存在拼写错误，并确认它与正确的应用相匹配。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）始终为 `non_field_errors`</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 简短的错误名称。可能的值：`paid_access_level_does_not_exist`。 |
| status_code | Integer | HTTP 状态码。始终为 `404`。                                  |

#### 响应示例 \{#response-example\}

未找到访问等级。

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paid access level `premium` does not exist"
      ]
    }
  ],
  "error_code": "paid_access_level_does_not_exist",
  "status_code": 400
}
```