要获取您的 **Public SDK Key**：

1. 前往 Adapty 控制台，导航至 [**App settings → General**](https://app.adapty.io/settings/general)。
2. 在 **Api keys** 部分，复制 **Public SDK Key**（不是 Secret Key）。
3. 将代码中的 `"YOUR_PUBLIC_SDK_KEY"` 替换为您的密钥。

:::important

- 请确保使用 **Public SDK key** 进行 Adapty 初始化，**Secret key** 仅应用于[服务端 API](getting-started-with-server-side-api)。
- **SDK keys** 对每个应用都是唯一的，如果您有多个应用，请确保选择正确的密钥。
:::