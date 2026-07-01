**Public SDK Key**'inizi almak için:

1. Adapty Kontrol Paneli'ne gidin ve [**App settings → General**](https://app.adapty.io/settings/general) sayfasına gidin.
2. **Api keys** bölümünden **Public SDK Key**'i kopyalayın (Secret Key'i değil).
3. Koddaki `"YOUR_PUBLIC_SDK_KEY"` ifadesini değiştirin.

Ya da [Adapty CLI](developer-cli) kullanarak programatik olarak alın:

```
npm install -g adapty
adapty auth login
adapty apps list
```

Ya da doğrudan:

```
npx adapty auth login
adapty apps list
```

- Adapty başlatma işlemi için **Public SDK key** kullandığınızdan emin olun; **Secret key** yalnızca [sunucu taraflı API](getting-started-with-server-side-api) için kullanılmalıdır.
- **SDK key**'leri her uygulama için benzersizdir, bu nedenle birden fazla uygulamanız varsa doğru olanı seçtiğinizden emin olun.