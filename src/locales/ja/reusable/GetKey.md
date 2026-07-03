**Public SDK Key** を取得するには：

1. Adapty ダッシュボードを開き、[**App settings → General**](https://app.adapty.io/settings/general) に移動します。
2. **Api keys** セクションで、**Public SDK Key**（Secret Key ではない）をコピーします。
3. コード内の `"YOUR_PUBLIC_SDK_KEY"` を置き換えます。

または、[Adapty CLI](developer-cli) を使ってプログラムから取得することもできます：

```
npm install -g adapty
adapty auth login
adapty apps list
```

あるいは、直接実行する場合：

```
npx adapty auth login
adapty apps list
```

- Adapty の初期化には必ず **Public SDK key** を使用してください。**Secret key** は[サーバーサイド API](getting-started-with-server-side-api) 専用です。
- **SDK keys** はアプリごとに固有です。複数のアプリがある場合は、正しいキーを選択してください。