
Pour obtenir votre **Public SDK Key** :

1. Accédez à l'Adapty Dashboard et naviguez vers [**App settings → General**](https://app.adapty.io/settings/general).
2. Dans la section **Api keys**, copiez la **Public SDK Key** (et NON la Secret Key).
3. Remplacez `"YOUR_PUBLIC_SDK_KEY"` dans le code.

Ou obtenez-la de façon programmatique via l'[Adapty CLI](developer-cli) :

```
npm install -g adapty
adapty auth login
adapty apps list
```

Ou, directement :

```
npx adapty auth login
adapty apps list
```

- Assurez-vous d'utiliser la **Public SDK key** pour l'initialisation d'Adapty — la **Secret key** ne doit être utilisée que pour l'[API côté serveur](getting-started-with-server-side-api).
- Les **SDK keys** sont propres à chaque application, donc si vous avez plusieurs applications, veillez à choisir la bonne.
