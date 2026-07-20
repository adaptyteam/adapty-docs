
| 参数               | 类型   | 必填 | 可为空 | 描述                                                         |
| :----------------- | :----- | ---- | ------ | :----------------------------------------------------------- |
| device_id          | String | 是   | 否     | 在客户端生成的设备标识符。                                   |
| device             | String | 否   | 是     | 终端用户可见的设备型号名称。                                 |
| locale             | String | 否   | 是     | 终端用户使用的语言区域设置。                                 |
| os                 | String | 否   | 是     | 终端用户使用的操作系统。                                     |
| platform           | String | 否   | 是     | 终端用户使用的设备平台。                                     |
| timezone           | String | 否   | 是     | 终端用户所在的时区。                                         |
| user_agent         | String | 否   | 是     | 终端用户环境的详细信息：与您的应用交互的终端用户的设备、操作系统和浏览器信息。 |
| idfa               | String | 否   | 是     | 广告标识符，由 Apple 分配给用户设备。                        |
| idfv               | String | 否   | 是     | 供应商标识符（IDFV），分配给同一开发者旗下所有应用，并在该开发者在您设备上的所有应用之间共享。 |
| advertising_id     | String | 否   | 是     | 广告 ID 是 Android 操作系统提供的唯一标识符，广告商可用其对您进行唯一标识。 |
| android_id         | String | 否   | 是     | 在 Android 8.0（API 级别 26）及更高版本平台上，这是一个 64 位数字（以十六进制字符串表示），对每个应用签名密钥、用户和设备的组合具有唯一性。详情请参阅 [Android 开发者文档](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID)。 |
| android_app_set_id | String | 否   | 是     | [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) —— 一种唯一的、按设备和开发者账号划分、用户可重置的 ID，适用于非变现广告场景。 |