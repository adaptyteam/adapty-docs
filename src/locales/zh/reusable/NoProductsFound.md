
请求失败，因为未找到与所提供令牌关联的产品。请确保所有必需的产品已添加到 Adapty 中对应的应用，并正确填写了 **Paddle Product ID** 和 **Paddle Price ID**。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）固定为 `non_field_errors`。</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 错误简称。可能的值：`no_products_found`。                    |
| status_code | Integer | HTTP 状态码。固定为 `400`。                                  |

#### 响应示例

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "No products found for purchase"
      ]
    }
  ],
  "error_code": "no_products_found",
  "status_code": 400
}
```

