请求失败，因为 `is_family_shared` 参数设置为 `true`，表示访问等级已免费与家庭成员共享。但是，[Price](server-side-api-objects#price) 对象的 `value` 参数未设置为零。

如果 `is_family_shared` 应为 `true`，请确保将 [Price](server-side-api-objects#price) 对象的 `value` 参数设置为 `0`。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 固定值为 `is_family_shared`</li><li> **errors**: 错误描述。</li></ul> |
| error_code  | String  | 简短的错误名称。固定值为：`family_share_price_error`。        |
| status_code | Integer | HTTP 状态码。固定值为 `400`。                                   |

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