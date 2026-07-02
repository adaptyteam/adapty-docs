Para obtener tu **Public SDK Key**:

1. Ve al Adapty Dashboard y navega a [**App settings → General**](https://app.adapty.io/settings/general).
2. En la sección **Api keys**, copia la **Public SDK Key** (NO la Secret Key).
3. Reemplaza `"YOUR_PUBLIC_SDK_KEY"` en el código.

O bien, obtenla de forma programática usando el [Adapty CLI](developer-cli):

```
npm install -g adapty
adapty auth login
adapty apps list
```

O directamente:

```
npx adapty auth login
adapty apps list
```

- Asegúrate de usar la **Public SDK key** para inicializar Adapty; la **Secret key** solo debe usarse para la [API del lado del servidor](getting-started-with-server-side-api).
- Las **SDK keys** son únicas para cada app, así que si tienes varias apps asegúrate de elegir la correcta.