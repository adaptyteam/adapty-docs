
| Nom              | Requis | Description                                                  |
| ---------------- | ------ | ------------------------------------------------------------ |
| store            | true   | Le store de l'application                                    |
| locale           | False  | Un identifiant de locale de paywall. Ce paramètre doit être un code de langue composé d'un ou plusieurs sous-tags séparés par le caractère "-". Le premier sous-tag désigne la langue, le second la région (la prise en charge des régions sera ajoutée ultérieurement). Exemple : `en` signifie anglais, `en-US` représente l'anglais américain. Le paywall sera créé dans la locale par défaut si le paramètre est omis. |
| placement_id     | true   | L'identifiant du [Placement](placements). Il s'agit de la valeur que vous avez indiquée lors de la création d'un placement dans votre Adapty Dashboard. |
| customer_user_id | true*  | Un identifiant d'un utilisateur dans votre système. `customer_user_id` ou `profile_id` est requis. |
| profile_id       | true*  | Un identifiant d'un utilisateur dans Adapty. `customer_user_id` ou `profile_id` est requis. |

**Exemple**

```
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}
```

