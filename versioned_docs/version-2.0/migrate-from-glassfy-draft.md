---
title: "Migrate from Glassfy (Draft)"
description: ""
metadataTitle: ""
---

### [Quick Start](https://docs.glassfy.io/docs/quick-start)

Является компиляцией других статей с повторением разделов и сниппетов, ее нет смысла отдельно рассматривать



### Installation

[iOS](https://docs.glassfy.io/docs/ios-installation): По сути у нас все то же самое, также поддерживается Cocoapods & SPM. [Наша дока](ios-installation)

[Android](https://docs.glassfy.io/docs/android-installation): По сути у нас все то же самое, [наша дока](android-installation)

[MacOS](https://docs.glassfy.io/docs/macos-installation): у нас нет отдельной статьи, но можно использовать статью из-под iOS

[React Native](https://docs.glassfy.io/docs/react-native-installation): По сути у нас все то же самое, а также пример для yarn (другой пакетный менеджер, альтернатива npm) и отдельный, более подробный раздел для Expo. [Наша дока](react-native-installation)

[Flutter](https://docs.glassfy.io/docs/flutter-installation): все 1в1 с [нашей докой](flutter-installation)

Ionic: мы не поддерживаем

### Configuration

В этом разделе у них только [одна статья](https://docs.glassfy.io/docs/sdk-configuration) связанная с SDK, остальные - общие статьи по адмикам.  
Внутри этой статьи есть только сниппет по инициализации SDK, у нас они описаны отдельно для каждой платформы. [Заголовочный пост в нашей доке](configuring-adapty-sdk)

### [Using SDK](https://docs.glassfy.io/docs/sdk-usage)

Обширная обзорная статья по основным функциям SDK, у нас такой нет, поэтому даю ссылки на каждый раздел отдельно:

#### [SDK Initialization](https://docs.glassfy.io/docs/sdk-usage#sdk-initialization)

Это все описано в нашей [Configure Adapty SDK](configuring-adapty-sdk)

#### [Fetch offerings](https://docs.glassfy.io/docs/sdk-usage#fetch-offerings)

**Glassfy:**

У них в одну функцию заложена загрузка пейволов и сразу же идет загрузка продуктов

```swift title="Swift"
Glassfy.offerings { (offerings, err) in
    if let offering = offerings?["premium"] {
        // display your offering's skus
        for sku in offering.skus {
            // sku.extravars
            // sku.product.localizedTitle
            // sku.product.localizedDescription
            // sku.product.price
        }
    }
}
```
```kotlin title="Kotlin"
Glassfy.offerings() { offers, err ->
    offers?.all
        ?.firstOrNull { it.offeringId == "premium_offering" }
        ?.also {
            // display your offering's skus
            for (sku in it.skus) {
                // sku.extravars
                // sku.product.title
                // sku.product.description
                // sku.product.price
            }
        }
}
```

**Adapty: **

У нас сначала [грузятся пейволы](fetch-paywalls-and-products#fetch-paywall-information), потом [отдельно продукты](fetch-paywalls-and-products#fetch-paywall-information)

```swift title="Swift"
Adapty.getPaywall(placementId: "YOUR_PLACEMENT_ID", locale: "en") { result in
    switch result {
        case let .success(paywall):
            // the requested paywall
        		// call getPaywallProducts here
        case let .failure(error):
            // handle the error
    }
}
```
```kotlin title="Kotlin"
Adapty.getPaywall("YOUR_PLACEMENT_ID", locale = "en") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            // the requested paywall
          	// call getPaywallProducts here
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

```swift title="Swift"
Adapty.getPaywallProducts(paywall: paywall) { result in    
    switch result {
    case let .success(products):
        // the requested products array
        for product in products {
            // product.localizedTitle
            // product.localizedDescription
            // product.localizedPrice
            // product.localizedSubscriptionPeriod
            // product.price 
        }
    case let .failure(error):
        // handle the error
    }
}
```
```kotlin title="Kotlin"
Adapty.getPaywallProducts(paywall) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val products = result.value
            // the requested products
            for (product in products) {
                // product.localizedTitle
                // product.localizedDescription
                // product.localizedPrice
                // product.localizedSubscriptionPeriod
                // product.price 
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```

Отдельно у нас описан процесс определения [intro offers eligibility](fetch-paywalls-and-products#check-intro-offer-eligibility-on-ios) , у них такой опции не видно  
Также не забыть вызвать [logShowPaywall](present-remote-config-paywalls#track-paywall-view-events)

#### [Fetch SKU](https://docs.glassfy.io/docs/sdk-usage#fetch-sku)

По сути функция позволяет загружать некий продукт по его id, в Adapty нет альтернативы

#### [Make purchases](https://docs.glassfy.io/docs/sdk-usage#make-purchases)

Выглядит как 1в1 с [нашей статьей](present-remote-config-paywalls#track-paywall-view-events)

#### [Upgrade subscription on Android](https://docs.glassfy.io/docs/sdk-usage#upgrade-subscription-on-android)

[Наш эквивалент](making-purchases#change-subscription-when-making-a-purchase)

#### [Restore purchases](https://docs.glassfy.io/docs/sdk-usage#restore-purchases)

Выглядит как 1в1 с [нашей статьей](restore-purchase)

#### [User properties](https://docs.glassfy.io/docs/sdk-usage#user-properties)

Наша альтернатива - updateProfile. [Дока](setting-user-attributes)

setDeviceToken - у нас нет альтернативы

setUserProperty - у нас [updateProfile](setting-user-attributes#setting-user-attributes)

setUserProperty(extra:) - у нас [custom attributes](setting-user-attributes#custom-user-attributes)

get userProperties - у нас они часть профиля, но только кастомные атрибуты ([getProfile](subscription-status))

#### [Custom identifier](https://docs.glassfy.io/docs/sdk-usage#custom-identifier)

Это 1в1 наш [identify](identifying-users), вероятно архитектурно у них это выглядит чуть иначе

#### [AccountableSku Info](https://docs.glassfy.io/docs/sdk-usage#accountablesku-info)

Кажется, у нас нет альтернативы

#### [Paddle Store info](https://docs.glassfy.io/docs/sdk-usage#paddle-store-info)

у нас нет альтернативы

#### Attributions attribute

TODO:

#### [Purchase History](https://docs.glassfy.io/docs/sdk-usage#purchase-history)

У них это история транзакций, а у нас похожая информация содержится в профиле [getProfile](subscription-status), но мы нигде не расписываем как пользоваться этой информацией (обычно всем достаточно accessLevel)

#### [Connect Glassfy Universal Code](https://docs.glassfy.io/docs/sdk-usage#connect-glassfy-universal-code)

Похоже на промо-коды которые генерит и применяет сам Glassfy, у нас нет такого

### [Verify Subscription Status](https://docs.glassfy.io/docs/verify-subscription-status)

У нас это [getProfile](subscription-status) и проверка accessLevel

### [Watcher Mode](https://docs.glassfy.io/docs/watcher-mode)

Это альтернатива нашего observerMode, как его включить описано в статье по [configure Adapty SDK](sdk-installation-ios#configure-adapty-sdk)