
| 名称             | 必填 | 描述                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| store            | true     | 应用商店                                                |
| locale           | False    | 付费墙语言区域的标识符。该参数应为由一个或多个子标签通过 "-" 字符分隔组成的语言代码。第一个子标签表示语言，第二个表示地区（地区支持将在后续版本中添加）。示例：`en` 表示英语，`en-US` 表示美国英语。若省略该参数，付费墙将以默认语言区域创建。 |
| placement_id     | true     | [版位](placements)的标识符。即您在 Adapty 看板中创建版位时指定的值。 |
| customer_user_id | true*    | 您系统中的用户标识符。`customer_user_id` 和 `profile_id` 二者必填其一。 |
| profile_id       | true*    | 用户在 Adapty 中的标识符。`customer_user_id` 和 `profile_id` 二者必填其一。 |

**示例**

```
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}
```

