**Public SDK Key**'inizi almak için:

1. Adapty Kontrol Paneli'ne gidin ve [**App settings → General**](https://app.adapty.io/settings/general) sayfasına geçin.
2. **Api keys** bölümünden **Public SDK Key**'i kopyalayın (Secret Key'i değil).
3. Koddaki `"YOUR_PUBLIC_SDK_KEY"` ifadesini bununla değiştirin.

:::important

- Adapty'yi başlatırken **Public SDK key** kullandığınızdan emin olun; **Secret key** yalnızca [sunucu tarafı API](getting-started-with-server-side-api) için kullanılmalıdır.
- **SDK key**'leri her uygulama için benzersizdir; birden fazla uygulamanız varsa doğru olanı seçtiğinizden emin olun.
:::