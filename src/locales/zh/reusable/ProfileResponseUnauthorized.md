
<p> </p>

由于授权信息缺失或不正确，请求失败。请查看 [Authorization](ss-authorization) 页面，并仔细检查 **Authorization header**。

同时，由于找不到指定的用户画像，请求也失败了。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）始终为 `non_field_errors`。</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 简短的错误名称。始终为 `not_authenticated`。                |
| status_code | Integer | HTTP 状态码。始终为 `401`。                                  |

#### 响应示例

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

 
