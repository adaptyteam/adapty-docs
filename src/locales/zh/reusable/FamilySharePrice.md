
请求失败，原因是 `is_family_shared` 参数设置为 `true`，表示该访问等级已免费共享给家庭成员。但 [Price](server-side-api-objects#price) 对象的 `value` 参数未设置为零。

如果 `is_family_shared` 应为 `true`，请确保将 [Price](server-side-api-objects#price) 对象的 `value` 参数设置为 `0`。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 始终为 `is_family_shared`</li><li> **errors**: 错误描述。</li></ul> |
| error_code  | String  | 简短错误名称。始终为：`family_share_price_error`。           |
| status_code | Integer | HTTP 状态码。始终为 `400`。                                  |

#### 响应示例

未找到用户画像

```json showLineNumbers
{
  "errors": [
    {
      "source": "is_family_shared",
      "errors": [
        "If is_family_shared is true, price.value must be 0."
      ]
    }
  ],
  "error_code": "family_share_price_error",
  "status_code": 400
}
```

 
