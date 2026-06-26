| 名前                     | 型                           | 必須               | 説明                                                         |
| ------------------------ | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                     | array of String values(data) | :heavy_plus_sign:  | チャートデータを取得したい日付または期間を入力します。 |
| compare_date             | array of String values(data) | :heavy_minus_sign: | 2つの日付または期間を比較する場合、こちらに古い方を入力し、新しい方を `date` パラメータに入力します。 |
| store                    | array of String values       | :heavy_minus_sign: | 購入が行われたアプリストアでフィルタリングします。指定可能な値は **app_store**、**play_store**、**stripe**、およびカスタムストアIDです。カスタムストアを使用する場合は、Adapty ダッシュボードで設定したIDを入力してください。 |
| country                  | array of String values       | :heavy_minus_sign: | 購入が行われた国の2文字の国コードでフィルタリングします。ISO 3166-1規格のコードを使用してください。 |
| store_product_id         | array of String values       | :heavy_minus_sign: | アプリストアにおけるプロダクトの一意の識別子です。このIDはAdapty ダッシュボードの [**Products**](https://app.adapty.io/products) セクションで確認できます。 |
| duration                 | array of String              | :heavy_minus_sign: | サブスクリプションの期間を指定します。指定可能な値は以下の通りです: <ul><li>Weekly</li><li>Monthly</li><li>2 months</li><li>3 months</li><li>6 months</li><li>Annual</li><li>Lifetime</li><li>Uncategorized</li></ul> |
| attribution_source       | array of String values       | :heavy_minus_sign: | アトリビューションのソースとなるインテグレーションです。指定可能な値は以下の通りです:<ul><li>adjust</li><li>airbridge</li><li>apple_search_ads</li><li>appsflyer</li><li>branch</li><li>custom</li></ul> |
| attribution_status       | array of String values       | :heavy_minus_sign: | アトリビューションがオーガニックかノンオーガニックかを示します。指定可能な値は以下の通りです: <ul><li>organic</li><li>non-organic</li><li>unknown</li></ul> |
| attribution_channel      | array of String values       | :heavy_minus_sign: | トランザクションに至ったマーケティングチャネルです。               |
| attribution_campaign     | array of String values       | :heavy_minus_sign: | トランザクションをもたらしたマーケティングキャンペーンです。             |
| attribution_adgroup      | array of String values       | :heavy_minus_sign: | トランザクションをもたらしたアトリビューションの広告グループです。           |
| attribution_adset        | array of String values       | :heavy_minus_sign: | トランザクションに至ったアトリビューションの広告セットです。              |
| attribution_creative     | array of String values       | :heavy_minus_sign: | 広告やキャンペーンにおける特定のビジュアルまたはテキスト要素で、効果測定（クリック数、コンバージョン数など）のために追跡されます。 |
| offer_category       | array of String values       | :heavy_minus_sign: | データを取得したいオファーカテゴリを指定します。指定可能な値は以下の通りです:<ul><li>introductory</li><li>promotional</li><li>winback</li></ul> |
| offer_type           | array of String values       | :heavy_minus_sign: | データを取得したいオファータイプを指定します。指定可能な値は以下の通りです:<ul><li>free_trial</li><li>pay_as_you_go</li><li>pay_up_front</li></ul> |
| offer_id             | array of String values       | :heavy_minus_sign: | データを取得したい特定のオファーを指定します。   |