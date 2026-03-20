| 名称             | 是否必填 | 描述                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| store            | 是     | 应用商店                                                |
| locale           | 否    | 付费墙语言环境的标识符。该参数应为由一个或多个子标签组成的语言代码，子标签之间以"-"字符分隔。第一个子标签表示语言，第二个子标签表示地区（地区支持将在后续添加）。示例：`en` 表示英语，`en-US` 表示美式英语。若省略该参数，将以默认语言环境创建付费墙。 |
| placement_id     | 是     | [版位](placements)的标识符。这是您在 Adapty 控制台中创建版位时指定的值。 |
| customer_user_id | 是*    | 您系统中用户的标识符。`customer_user_id` 或 `profile_id` 二者必填其一。 |
| profile_id       | 是*    | 用户在 Adapty 中的标识符。`customer_user_id` 或 `profile_id` 二者必填其一。 |

**示例**

```
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}
```