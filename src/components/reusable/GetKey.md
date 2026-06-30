

To get your **Public SDK Key**:

1. Go to Adapty Dashboard and navigate to [**App settings → General**](https://app.adapty.io/settings/general).
2. From the **Api keys** section, copy the **Public SDK Key** (NOT the Secret Key).
3. Replace `"YOUR_PUBLIC_SDK_KEY"` in the code.

Or, get it programmatically, using the [Adapty CLI](developer-cli):

```
npm install -g adapty
adapty auth login
adapty apps list
```

Or, directly :

```
npx adapty auth login
adapty apps list
```

- Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.
- **SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
