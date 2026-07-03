获取您的 **Public SDK Key**：

1. 打开 Adapty 看板，导航至 [**App settings → General**](https://app.adapty.io/settings/general)。
2. 在 **Api keys** 部分，复制 **Public SDK Key**（不是 Secret Key）。
3. 将代码中的 `"YOUR_PUBLIC_SDK_KEY"` 替换为实际值。

或者，使用 [Adapty CLI](developer-cli) 以编程方式获取：

```
npm install -g adapty
adapty auth login
adapty apps list
```

或者，直接运行：

```
npx adapty auth login
adapty apps list
```

- 请确保使用 **Public SDK key** 初始化 Adapty，**Secret key** 仅用于[服务端 API](getting-started-with-server-side-api)。
- **SDK keys** 对每个应用都是唯一的，如果您有多个应用，请确保选择正确的那个。