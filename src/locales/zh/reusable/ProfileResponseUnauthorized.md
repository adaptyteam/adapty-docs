<p> </p>

由于授权信息缺失或不正确，请求失败。请查看[授权](ss-authorization)页面，并仔细检查 **Authorization header**。

该请求也因未找到指定的用户画像而失败。

#### 请求体 \{#body\}

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（字符串）始终为 `non_field_errors`。</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 简短错误名称。始终为 `not_authenticated`。                   |
| status_code | Integer | HTTP 状态码。始终为 `401`。                                  |

#### 响应示例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Authentication credentials were not provided."
      ]
    }
  ],
  "error_code": "not_authenticated",
  "status_code": 401
}
```