<!--- Offer.md --->



| Parameter      | Type   | Required in request | Nullable in request | Description                                                  |
| -------------- | ------ | ------------------- | ------------------- | ------------------------------------------------------------ |
| offer_category | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The category of the applied offer. Options are: **introductory**, **promotional**, **offer_code**, **win_back**. |
| offer_type     | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The type of active offer. Options are: **free_trial**, **pay_as_you_go**, **pay_up_front**, and **unknown**. If this isn’t null, it means the offer was applied in the current subscription period. |
| offer_id       | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The ID of the applied offer.                                 |