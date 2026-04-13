| Parametre | Tür | İstekte zorunlu | İstekte boş olabilir | Açıklama |
| --------- | ------ | ------------------- | ------------------- | ------------------------------------------------------------ |
| category | String | :heavy_plus_sign: | :heavy_minus_sign: | Uygulanan teklifin kategorisi. Seçenekler: **introductory**, **promotional**, **offer_code**, **win_back**. |
| type | String | :heavy_plus_sign: | :heavy_minus_sign: | Aktif teklifin türü. Seçenekler: **free_trial**, **pay_as_you_go**, **pay_up_front** ve **unknown**. Bu değer null değilse, teklif mevcut abonelik döneminde uygulanmış demektir. |
| id | String | :heavy_minus_sign: | :heavy_plus_sign: | Uygulanan teklifin ID'si. |