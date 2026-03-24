| 参数 | 类型 | 必填 | 可为空 | 描述 |
| :----------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| first_name         | String        | 否       | 是      | 终端用户的名字。                                  |
| last_name          | String        | 否       | 是      | 终端用户的姓氏。                                   |
| gender             | String        | 否       | 是      | 终端用户的性别。                                      |
| email              | String        | 否       | 是      | 终端用户的电子邮件。                                       |
| phone_number       | String        | 否       | 是      | 终端用户的电话号码。                                |
| birthday           | ISO 8601 date | 否       | 否       | 终端用户的生日。                                    |
| ip_country         | String        | 否       | 否       | 终端用户所在国家/地区，采用 ISO 3166-2 格式。若请求从服务器端而非客户端发出，则需要传入此参数以设置当前国家/地区；否则，我们将通过请求的 IP 地址自动判断国家/地区。 |
| store_country      | String        | 否       | 是      | 终端用户应用商店所在国家/地区。                         |
| store              | String        | 否       | 是      | 用户在您应用中进行购买所使用的平台。可选值：`app_store`、`play_store` 或 `stripe`。 |
| analytics_disabled | Boolean       | 否       | 否       | <p>退出外部分析的选项。当分析功能被禁用时，事件将不会发送至集成服务，且 `idfa`、`idfv` 和 `advertising_id` 字段将变为可为空。</p><p>开启：该用户已退出外部分析。</p><p>关闭：默认启用分析功能。</p> |
| custom_attributes  | Array         | 否       | 否       | <p>允许为用户画像设置最多 30 个自定义属性。若使用 `custom_attributes` 数组，则至少需要一对键值对。</p><p>**键：** 必须为字符串，长度不超过 30 个字符，且只能使用字母、数字、短横线、句点和下划线。</p><p>**值：** 必须为字符串或浮点数，长度不超过 30 个字符。布尔值和整数将被转换为浮点数。若要删除某个属性，请发送空值或 `null`。</p> |
| installation_meta  | Object        | 否       | 否       | 包含特定设备上特定应用的相关信息，结构为 [Installation Meta](server-side-api-objects#installation-meta) 对象。 |