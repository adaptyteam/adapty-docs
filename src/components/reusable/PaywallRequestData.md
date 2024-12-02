<!--- PaywallRequestData --->

<h2 id="tocS_PaywallRequestData">PaywallRequestData</h2>

```json
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}

```

PaywallRequestData

### Properties

| Name             | Required | Description                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| store            | true     | The app store                                                |
| locale           | False    | An identifier of a paywall locale. This parameter is expected to be a language code composed of one or more subtags separated by the "-" character. The first subtag is for the language, the second one is for the region (The support for regions will be added later).  Example: `en` means English, `en-US` represents US English. The paywall will be created in the default locale if the parameter is omitted. |
| placement_id     | true     | The identifier of the [Placement](https://adapty.io/docs/placements). This is the value you specified when creating a placement in your Adapty Dashboard. |
| customer_user_id | true*    | An identifier of a user in your system. Either `customer_user_id` or `profile_id` is required. |
| profile_id       | true*    | An identifier of a user in Adapty. Either `customer_user_id` or `profile_id` is required. |
