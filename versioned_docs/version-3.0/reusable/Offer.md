<!--- Offer.md --->



| Parameter      | Type   | Required in request | Nullable in request | Description                                                  |
| -------------- | ------ | ------------------- | ------------------- | ------------------------------------------------------------ |
| offer_category | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The category of teh applied offer. Possible values are: **introductory**, **promotional**, **offer_code**, **win_back**. |
| offer_type     | String | :heavy_plus_sign:   | :heavy_minus_sign:  | The type of active offer. Possible values are: **free_trial**, **pay_as_you_go**,  **pay_up_front**, and **unknown**. If the value is not null it means that the offer was applied during the current subscription period |
| offer_id       | String | :heavy_minus_sign:  | :heavy_plus_sign:   | The ID of the applied offer                                  |