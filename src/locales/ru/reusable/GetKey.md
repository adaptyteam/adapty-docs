Чтобы получить **Public SDK Key**:

1. Откройте дашборд Adapty и перейдите в [**App settings → General**](https://app.adapty.io/settings/general).
2. В разделе **Api keys** скопируйте **Public SDK Key** (НЕ Secret Key).
3. Замените `"YOUR_PUBLIC_SDK_KEY"` в коде.

Или получите его программно с помощью [Adapty CLI](developer-cli):

```
npm install -g adapty
adapty auth login
adapty apps list
```

Или напрямую:

```
npx adapty auth login
adapty apps list
```

- Убедитесь, что для инициализации Adapty вы используете **Public SDK key** — **Secret key** предназначен только для [серверного API](getting-started-with-server-side-api).
- **SDK-ключи** уникальны для каждого приложения, поэтому если у вас несколько приложений, выберите нужный ключ.