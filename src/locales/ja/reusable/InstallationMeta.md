| パラメータ          | 型     | 必須 | Null許容 | 説明                                                  |
| :----------------- | :----- | ---- | -------- | :----------------------------------------------------------- |
| device_id          | String | Yes  | No       | クライアント側で生成されるデバイス識別子。       |
| device             | String | No   | Yes      | エンドユーザーに表示されるデバイスのモデル名。                      |
| locale             | String | No   | Yes      | エンドユーザーが使用しているロケール。                             |
| os                 | String | No   | Yes      | エンドユーザーが使用しているオペレーティングシステム。                   |
| platform           | String | No   | Yes      | エンドユーザーが使用しているデバイスのプラットフォーム。                    |
| timezone           | String | No   | Yes      | エンドユーザーのタイムゾーン。                                |
| user_agent         | String | No   | Yes      | エンドユーザーの環境に関する詳細情報（デバイス、オペレーティングシステム、およびアプリケーションを操作しているエンドユーザーのブラウザ情報）。 |
| idfa               | String | No   | Yes      | Apple がユーザーのデバイスに割り当てる広告識別子（Identifier for Advertisers）。 |
| idfv               | String | No   | Yes      | Identifier for Vendors（IDFV）は、1つのデベロッパーが提供するすべてのアプリに割り当てられるコードで、そのデベロッパーのすべてのアプリ間でデバイス上で共有されます。 |
| advertising_id     | String | No   | Yes      | Advertising ID は Android OS が提供する一意の識別子で、広告主がユーザーを一意に識別するために使用できます。 |
| android_id         | String | No   | Yes      | Android 8.0（API レベル 26）以降では、アプリの署名キー・ユーザー・デバイスの組み合わせごとに一意の 64 ビット数値（16進数文字列）。詳細は [Android デベロッパードキュメント](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID) をご覧ください。 |
| android_app_set_id | String | No   | Yes      | [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) — デバイスごと・デベロッパーアカウントごとに割り当てられる、非収益化広告用途向けのユーザーリセット可能な一意の ID。 |